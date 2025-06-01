export default function TermsAndConditions() {
  return (
    <main className="col-span-2 flex items-center justify-center min-h-[500px]">
      <div className="bg-white/10 rounded-xl p-8 col-span-2 h-full min-h-[400px] border-white/10 border w-full max-w-xl flex flex-col items-center justify-center shadow-lg">
        <div className="flex flex-col gap-4 items-center text-center w-full">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 via-green-300 to-green-500 bg-clip-text text-transparent">
            Terms and Conditions
          </h1>

          <div className="text-left text-white/90 text-base flex flex-col gap-4 mt-4 w-full">
            <p>
              The $TICKET token will not be offered in the United States or to
              U.S. persons or to residents of certain other prohibited
              jurisdictions. The information provided on this website is for
              general informational purposes only. It does not constitute, and
              should not be considered, a formal offer to sell or a solicitation
              of an offer to buy any security in any jurisdiction, legal advice,
              investment advice, or tax advice.
            </p>

            <p>
              If you are in need of legal advice, investment advice, or tax
              advice, please consult with a professional adviser. The protocol
              is under development and is subject to change. As such, the
              protocol documentation and contents of this website may not
              reflect the current state of the protocol at any given time. The
              protocol documentation and website content are not final and are
              subject to change.
            </p>

            <p>By using our platform, you acknowledge and agree that:</p>

            <ul className="flex flex-col gap-3">
              <li>
                <span role="img" aria-label="warning">
                  ⚠️
                </span>{" "}
                We are not responsible for any financial losses, damages, or
                other consequences that may result from using our platform.
              </li>

              <li>
                <span role="img" aria-label="warning">
                  ⚠️
                </span>{" "}
                You use the platform at your own risk and are solely responsible
                for your actions and decisions.
              </li>

              <li>
                <span role="img" aria-label="warning">
                  ⚠️
                </span>{" "}
                You understand that cryptocurrency and blockchain technology
                involve inherent risks, including but not limited to market
                volatility, technical issues, and regulatory changes.
              </li>

              <li>
                <span role="img" aria-label="warning">
                  ⚠️
                </span>{" "}
                You are responsible for maintaining the security of your account
                and any associated private keys or credentials.
              </li>

              <li>
                <span role="img" aria-label="warning">
                  ⚠️
                </span>{" "}
                We make no warranties or representations about the accuracy,
                reliability, or completeness of the information provided on our
                platform.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
