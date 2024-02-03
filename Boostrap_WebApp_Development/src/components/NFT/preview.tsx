
export default function Preview() {

    const nfts = [
        { collection: 'My NFT Collection', name: 'My First NFT', owner: 'core1zgdprlr3hz5hhke9ght8mq723a8wlnzqwd60hm', data: '124' },
        { collection: 'My NFT Collection', name: 'My First NFT', owner: 'core1zgdprlr3hz5hhke9ght8mq723a8wlnzqwd60hm', data: '124' },
        { collection: 'My NFT Collection', name: 'My First NFT', owner: 'core1zgdprlr3hz5hhke9ght8mq723a8wlnzqwd60hm', data: '124' },
        { collection: 'My NFT Collection', name: 'My First NFT', owner: 'core1zgdprlr3hz5hhke9ght8mq723a8wlnzqwd60hm', data: '124' },
        { collection: 'My NFT Collection', name: 'My First NFT', owner: 'core1zgdprlr3hz5hhke9ght8mq723a8wlnzqwd60hm', data: '124' },
        { collection: 'My NFT Collection', name: 'My First NFT', owner: 'core1zgdprlr3hz5hhke9ght8mq723a8wlnzqwd60hm', data: '124' },
    ]


    return (
        <div className="px-10 sm:px-6 lg:px-20">

            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                            Collection
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Name
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Owner
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Data
                                        </th>
                                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                            <span className="sr-only">URI</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {nfts.map((person) => (
                                        <tr key={person.collection}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                {person.name}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.name}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.owner}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.data}</td>
                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                                    URI<span className="sr-only">, {person.name}</span>
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
