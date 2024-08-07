import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { DropdownIcon } from "../../assets/DropdownIcon";

interface DropdownItem {
  label: string;
  callback?: () => void;
  icon: string;
  type?: string;
  link?: string;
}

interface DropdownProps {
  title: string;
  dropdownItems: DropdownItem[];
}

export const Dropdown = ({ title, dropdownItems }: DropdownProps) => {
  return (
    <Menu as="div" className="relative inline-block text-left z-50">
      <div>
        <Menu.Button className="inline-flex w-full justify-center items-center rounded-3xl bg-gradient-green-card-button px-3 py-2 text-sm font-medium text-[#25D695] ring-0">
          {`${title.slice(0, 10)}....`}
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.3714 12.6823C10.1727 12.903 9.8267 12.903 9.62807 12.6823L5.6079 8.21541C5.31831 7.89365 5.54666 7.38093 5.97955 7.38093H14.0199C14.4528 7.38093 14.6811 7.89365 14.3915 8.21541L10.3714 12.6823Z"
              fill="#25D695"
            />
          </svg>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-[#1B1D23] shadow-lg ring-0 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {dropdownItems.map((dropdownItem, index) => {
              return (
                <Menu.Item key={`dropdown-${index}`}>
                  {dropdownItem.type !== "link" ? (
                    <div
                      onClick={dropdownItem.callback}
                      className="flex items-center px-4 py-2 text-sm text-[#868991] cursor-pointer hover:opacity-60"
                    >
                      <DropdownIcon className="mr-2" type={dropdownItem.icon} />{" "}
                      {dropdownItem.label}
                    </div>
                  ) : (
                    <a
                      href={dropdownItem.link}
                      target="blank"
                      className="flex items-center px-4 py-2 text-sm text-[#868991] cursor-pointer hover:opacity-60"
                    >
                      <DropdownIcon className="mr-2" type={dropdownItem.icon} />{" "}
                      {dropdownItem.label}
                    </a>
                  )}
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
