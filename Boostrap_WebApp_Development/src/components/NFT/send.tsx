export default function Send() { 

    return (
        <div className="mx-60 rounded-md p-10 text-white ">
            <div className='inline-block'>
                <h2 className='text-3xl'>Send your <a href='https://www.coreum.com/smart-tokens' className='text-[#25D695] text-md font-bold'>Smart Tokens</a> NFT</h2>
                <div className="my-5 text-xl ">
                    <p className='mt-2'>Depending of the nature of your Smart Token you can send it to another user.</p>
                    <p className='mt-2'>Note that you wont be able to redeem your asset unless the receiver send it back to you.</p>

                </div>

            </div>
            <form className="flex flex-col placeholder-white font-semibold text-xl">
                <input type="text" placeholder="Class ID" className="placeholder-white bg-[#25D695]/[.09] rounded-md p-2 my-2 border-0" />
                <input type="text" placeholder="NFT ID" className="placeholder-white bg-[#25D695]/[.09] rounded-md p-2 my-2 border-0" />
                <input type="text" placeholder="Receiver" className="placeholder-white bg-[#25D695]/[.09] rounded-md p-2 my-2 border-0" />
              
                {/* Toogles */}
                
                <button className="w-1/4 mt-5 bg-[#25D695]/[.09] hover:bg-emerald-700 text-white px-10 py-2 rounded-md">Send</button>


            </form>
        </div>

    );
}
