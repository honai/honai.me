require "date"
require "fileutils"
require "json"

require "pdf-reader"


def parseDateFile(basename)
	p basename
	splited = basename.split("-", 4)
	date_str = splited[0...3].join("-")
	# パースできるか確認
	begin
		Date.strptime(date_str, "%Y-%m-%d")
	rescue => e
		raise e
	end
	return { :stem => splited[3], :date => date_str }
end


def pdfToPngAndJson(in_pdf, out_dir_base, image_link_base, size)
	# pdftoppm
	file_prefix = "s"
	command = "pdftoppm -png #{size ? "-scale-to #{size}" : ""} #{in_pdf} #{out_dir_base}/#{file_prefix}"
	puts "Command: #{command}"
	if !system(command)
		raise RuntimeError
	end

	reader = PDF::Reader.new(in_pdf)

	pad_length = reader.page_count.to_s.length
	# TODO: map, filterを使って書きなおす
	title = ""
	if firstText = reader.pages[0].text
		title = firstText.split("\n", 2)[0].strip()
	end
	pages_result = []
	reader.pages.each do |page|
		page_result = {
			"image" => "#{image_link_base}/#{file_prefix}-#{page.number.to_s.rjust(pad_length, "0")}.png",
			"width" => page.width,
			"height" => page.height,
			"links" => [],
			"text" => page.text
		}
		anno_refs = page.attributes[:Annots]
		if anno_refs != nil
			anno_refs.each do |anno_ref|
				anno = reader.objects[anno_ref]
				if anno[:Subtype] == :Link
					page_result["links"].push({
						"rect" => anno[:Rect],
						"url" => anno[:A][:URI]
					})
				end
			end
		end
		pages_result.push(page_result)
	end

	result = {
		"title" => title,
		"pages" => pages_result
	}

	return result
end

def main
	src = Pathname("#{__dir__}/src")
	image_base = src.join("images/slides")
	data_dir = src.join("_data/slides")
	src.join("slides").glob("*.pdf").each do |pdf_file|
		pdf_stem, date = parseDateFile(pdf_file.basename(".pdf").to_s).values_at(:stem, :date)
		json_path = data_dir.join("#{pdf_stem}.json")
		if json_path.exist?
			puts "Skipped #{pdf_file}"
			next
		end
		image_dir = image_base.join(pdf_stem)
		FileUtils.mkdir_p(image_dir)
		res = pdfToPngAndJson(pdf_file, image_dir, "/images/slides/#{pdf_stem}", 1280)
		res["date"] = date
		res["pdf"] = "/slides/#{pdf_file.basename()}"
		FileUtils.mkdir_p(data_dir)
		File.write(json_path, JSON.generate(res))
	end
end

main()
