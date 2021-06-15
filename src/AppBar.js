import React from 'react'
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'

const navigation = ['Shop']
const profile = ['Your Profile', 'Settings', 'Sign out']

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const AppBar = ({ address, handleWalletButton, isDisabled }) => {
    return (
        <div className="sticky top-0">
            <Disclosure as="nav" className="bg-gray-800 ">
                {({ open }) => (
                    <>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-2 ">
                            <div className="flex items-center justify-between h-16">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <img
                                            className="h-8 w-8"
                                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Gram_cryptocurrency_logo.svg/512px-Gram_cryptocurrency_logo.svg.png"
                                            alt="Workflow"
                                        />
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="ml-10 flex items-baseline space-x-4">
                                            {navigation.map((item, itemIdx) =>
                                                itemIdx === 0 ? (
                                                    <Fragment key={item}>
                                                        {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                                                        <a href="#" className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">
                                                            {item}
                                                        </a>
                                                    </Fragment>
                                                ) : (
                                                    <a
                                                        key={item}
                                                        href="#"
                                                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                                    >
                                                        {item}
                                                    </a>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="hidden md:block">
                                    <div className="ml-4 flex items-center md:ml-6">

                                        {/* <span> {address}</span> */}
                                        <button className="  overflow-ellipsis overflow-hidden whitespace-nowrap transition duration-500 ease-in-out  bg-gradient-to-r p-2 border-2 border-gray-700 rounded-full m-7 from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600  transform hover:-translate-y-1 hover:scale-110 text-sm font-bold " disabled={isDisabled} onClick={handleWalletButton}>
                                            {/* <span className="overflow-ellipsis overflow-hidden whitespace-nowrap"> {address ?<span> Connected</span>: ''} {address ?  address : "Connect wallet"}</span> */}
                                            {address.length > 0 ? (
                                                "Connected: " +
                                                String(address).substring(0, 6) +
                                                "..." +
                                                String(address).substring(38)
                                            ) : (
                                                <span>Connect Wallet</span>
                                            )}


                                        </button>

                                    </div>
                                </div>
                                <div className="-mr-2 flex md:hidden">

                                    {/* Mobile menu button */}
                                    <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </Disclosure.Button>
                                </div>
                            </div>
                        </div>

                        <Disclosure.Panel className="md:hidden">
                            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                {navigation.map((item, itemIdx) =>
                                    itemIdx === 0 ? (
                                        <Fragment key={item}>
                                            {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                                            <a href="#" className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium">
                                                {item}
                                            </a>
                                        </Fragment>
                                    ) : (
                                        <a
                                            key={item}
                                            href="#"
                                            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                                        >
                                            {item}
                                        </a>
                                    )
                                )}
                            </div>
                            <div className="pt-4 pb-3 border-t border-gray-700">
                                <div className="flex items-center px-5">



                                    <button className=" mx-auto transition duration-500 ease-in-out  bg-gradient-to-r p-2 border-2 border-gray-700 rounded-full m-7 from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600  transform hover:-translate-y-1 hover:scale-110 text-sm font-bold " disabled={isDisabled} onClick={handleWalletButton}>
                                        {address.length > 0 ? (
                                            "Connected: " +
                                            String(address).substring(0, 6) +
                                            "..." +
                                            String(address).substring(38)
                                        ) : (
                                            <span>Connect Wallet</span>
                                        )}
                                    </button>


                                </div>

                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        </div>
    )
}

export default AppBar;