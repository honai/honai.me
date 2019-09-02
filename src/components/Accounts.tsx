import accountsData, { AccountType } from 'src/resources/accounts'

const Account = (account: AccountType): JSX.Element => (
  <a href={account.url} target="_blank" className="reset" rel="noopener noreferrer">
    <figure dangerouslySetInnerHTML={{ __html: account.svg }} />
    <style jsx>
      {`
        a {
          display: block;
          padding: 10px;
        }
        figure {
          margin: 0;
          width: 48px;
          height: 48px;
        }
      `}
    </style>
  </a>
)

const Accounts = (): JSX.Element => (
  <>
    <ul className="reset">
      {accountsData.map(
        (account, idx): JSX.Element => (
          <li key={idx}>
            <Account {...account} />
          </li>
        )
      )}
    </ul>
    <style jsx>
      {`
        ul {
          display: flex;
        }
      `}
    </style>
  </>
)

export default Accounts
