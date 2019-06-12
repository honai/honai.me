import accountsData, { AccountType } from '../resources/accounts'

const Account = (account: AccountType): JSX.Element => (
  <a href={account.url} target="_blank" className="reset" rel="noopener noreferrer">
    <figure dangerouslySetInnerHTML={{ __html: account.svg }} />
    <span>{`${account.serviceName} - ${account.userName}`}</span>
    <style jsx>
      {`
        a {
          display: flex;
          align-items: center;
          padding: 5px;
          box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
          border-radius: 48px;
        }
        figure {
          margin: 0 20px 0 0;
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
          display: grid;
          grid-row-gap: 10px;
        }
      `}
    </style>
  </>
)

export default Accounts
