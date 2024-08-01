import { useState } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Bar(props: any) {
  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 focus:border-green-500 focus:ring-green-500"
          defaultValue={props.tabs.find((tab) => tab.current).name}
          onChange={(e) => props.setCurrentTab(e.target.value)}
        >
          {props.tabs.map((tab) => (
            <option
              value={tab.name}
              onClick={() => props.setCurrentTab(tab.name)}
              key={tab.name}
            >
              {tab.name}
            </option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <nav
          className="isolate flex divide-x divide-gray-200 rounded-lg shadow"
          aria-label="Tabs"
        >
          {props.tabs.map((tab, tabIdx) => (
            <a
              key={tab.name}
              onClick={() => props.setCurrentTab(tab.name)}
              className={classNames(
                tab.name === props.curentTab
                  ? "text-gray-900 text-xl"
                  : "text-gray-500 hover:text-gray-700",
                tabIdx === 0 ? "rounded-l-lg" : "",
                tabIdx === props.tabs.length - 1 ? "rounded-r-lg" : "",
                "group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10"
              )}
              aria-current={tab.current ? "page" : undefined}
            >
              <span>{tab.name}</span>
              <span
                aria-hidden="true"
                className={classNames(
                  tab.name === props.curentTab
                    ? "bg-green-500"
                    : "bg-transparent",
                  "absolute inset-x-0 bottom-0 h-0.5"
                )}
              />
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
