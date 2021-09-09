import FacebookIcon from "./svg/facebook.svg"
import GitHubIcon from "./svg/github.svg"
import LinkedInIcon from "./svg/linkedin.svg"
import TwitterIcon from "./svg/twitter.svg"

export default {
  links: [
    {
      url: "https://github.com/honai",
      text: "github.com/honai",
      Icon: GitHubIcon,
    },
    {
      url: "https://twitter.com/_honai",
      text: "twitter.com/_honai",
      Icon: TwitterIcon,
    },
    {
      url: "https://www.facebook.com/honai.ueoka/",
      text: "facebook.com/honai.ueoka",
      Icon: FacebookIcon,
    },
    {
      url: "https://www.linkedin.com/in/honai-ueoka/",
      text: "linkedin.com/in/honai-ueoka",
      Icon: LinkedInIcon,
    },
  ],
  education: [
    {
      period: "2021.4 -",
      title: "京都大学大学院 情報学研究科 通信情報システム専攻 大木研究室（知的通信網分野）",
    },
    {
      period: "2020.4 - 2021.3",
      title: "京都大学 工学部 電気電子工学科 黒橋研究室（言語メディア分野）",
    },
    {
      period: "2017.4 - 2021.3",
      title: "京都大学 工学部 電気電子工学科",
    },
  ],
  jobs: [
    {
      period: "2021.3～",
      title: "ピクシブ株式会社（アルバイト）",
    },
    {
      period: "2021.8",
      title: "ヤフー株式会社（インターン, 2 weeks）"
    },
    {
      period: "2020.3",
      title: "ピクシブ株式会社（インターン, 1 week）",
    },
    {
      period: "2019.8",
      title: "株式会社サイバーエージェント（インターン, 3 weeks）",
    },
  ],
  publications: [
    {
      title: "Frustratingly Easy Edit-based Linguistic Steganography with a Masked Language Model.",
      authors: "Honai Ueoka, Yugo Murawaki and Sadao Kurohashi.",
      journal:
        "In Proceedings of the 2021 Conference of the North American Chapter of the Association for Computational Linguistics: Human Language Technologies (NAACL-HLT 2021), pp. 5486-5492, online, June 2021. (short paper).",
      links: [
        { text: "paper", url: "https://www.aclweb.org/anthology/2021.naacl-main.433/" },
        { text: "code", url: "https://github.com/ku-nlp/steganography-with-masked-lm" },
      ],
    },
    {
      title: "A System for Worldwide COVID-19 Information Aggregation.",
      authors:
        "Akiko Aizawa, Frederic Bergeron, Junjie Chen, Fei Cheng, Katsuhiko Hayashi, Kentaro Inui, Hiroyoshi Ito, Daisuke Kawahara, Masaru Kitsuregawa, Hirokazu Kiyomaru, Masaki Kobayashi, Takashi Kodama, Sadao Kurohashi, Qianying Liu, Masaki Matsubara, Yusuke Miyao, Atsuyuki Morishima, Yugo Murawaki, Kazumasa Omura, Haiyue Song, Eiichiro Sumita, Shinji Suzuki, Ribeka Tanaka, Yu Tanaka, Masashi Toyoda, Nobuhiro Ueda, Honai Ueoka, Masao Utiyama, Ying Zhong.",
      journal:
        "Workshop on NLP for COVID-19 (Part 2) at EMNLP 2020, online, November 2020. (workshop)",
      links: [{ text: "paper", url: "https://www.aclweb.org/anthology/2020.nlpcovid19-2.13/" }],
    },
  ],
  presentations: [
    {
      title: "IPv6と日本のインターネット",
      subtitle: "CAMPHOR- DAY 2021",
      url: "https://speakerdeck.com/honai/ipv6-internet-in-japan",
      thumb: "ipv6.jpg",
      date: "2021/03/27",
    },
    {
      title: "pixivの選考インターンに行ってきた",
      subtitle: "インターン報告大会",
      url: "https://docs.google.com/presentation/d/e/2PACX-1vSs0HRmFPKl-ux8W8nMCp_rKAmVmq0OiSFS7_Sk1mdTrM7OvntyrYEGqD5SivnGbwUNcxNkf14xiLjv/pub?start=false&loop=false&delayms=3000",
      thumb: "pixiv-intern.png",
      date: "2020/10/10",
    },
    {
      title: "入門HTTP",
      subtitle: "CAMPHOR- DAY 2020",
      url: "https://speakerdeck.com/honai/introducing-http",
      thumb: "http.jpg",
      date: "2020/03/29",
    },
  ],
}
