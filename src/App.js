import React, { useState } from "react";
import "/Users/tagline/Desktop/r/filter/src/index.css";
export default function App() {
  const [data, setData] = useState([
    {
      id: 1,
      name: "foo",
      city: "dallas",
      category: "one",
      type: "A",
      active: "FALSE",
    },
    {
      id: 2,
      name: "bar",
      city: "dallas",
      category: "one",
      type: "B",
      active: "FALSE",
    },
    {
      id: 3,
      name: "jim",
      city: "san francisco",
      category: "one",
      type: "B",
      active: "TRUE",
    },
    {
      id: 4,
      name: "jane",
      city: "denver",
      category: "two",
      type: "C",
      active: "FALSE",
      add: "vgvvg",
    },
    {
      id: 5,
      name: "f",
      city: "denver",
      category: "two",
      type: "C",
      active: "FALSE",
      add: "vgvvg",
    },
  ]);

  let tempArr = [];
  const newArray = data.map((item) => {
    return tempArr.push(...Object.keys(item));
  });
  const useKeys = Array(...new Set(tempArr));

  const initialFilters = () => {
    const initial = {};
    useKeys.map((item) => {
      initial[item] = [];
    });
    return initial;
  };
  const [filters, setFilters] = useState(initialFilters());
  // const display = Object.values(filters).every((item) => item.length === 0);

  const uniqueElement = (element) => {
    const uniqueData = data.map((item) => {
      return item[element];
    });
    return Array(...new Set(uniqueData));
  };
  const handleCheckbox = (name, item) => {
    setFilters((prev) => ({
      ...prev,
      [name]: prev[name].includes(item)
        ? prev[name].filter((element) => element !== item)
        : [...prev[name], item],
    }));
  };
  const handleNameChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };

  // const FilterData = data.filter((item) => {
  //   if (filters.name !== "") {
  //     return useKeys.every((key) =>
  //       key !== "name" ? filters[key].length === 0 : true
  //     ) && item.name.includes(filters.name)
  //       ? item
  //       : item.name.includes(filters.name) &&
  //           filters.name !== "" &&
  //           useKeys.some((key) => {
  //             if (key !== "name") {
  //               return filters[key].includes(item[key]);
  //             }
  //           });
  //   } else {
  //     return useKeys.some((key) =>
  //       key !== "name"
  //         ? filters[key].includes(item[key])
  //         : item.name.includes(filters.name) && filters["name"] !== ""
  //     );
  //   }
  // });

  // const FilterData = data.filter((item) => {
  //   return filters.name.length !== 0
  //     ? useKeys.every((key) =>
  //         key !== "name" ? filters[key].length === 0 : true
  //       ) && item.name.includes(filters.name)
  //       ? item
  //       : item.name.includes(filters.name) &&
  //         useKeys.some(
  //           (key) => key !== "name" && filters[key].includes(item[key])
  //         )
  //     : useKeys.some((key) => filters[key].includes(item[key]));
  // });

  const FilterData = data.filter((item) => {
    return Object.entries(filters).every(([key, value]) => {
      if (key === "name") {
        return item["name"].includes(value);
      } else {
        return value.length === 0 || value.includes(item[key]);
      }
    });
  });

  //value=empty ya value includes

  return (
    <>
      <div className="flex-container">
        {useKeys.map((item) => {
          if (item !== "id" && item !== "name") {
            return (
              <div className="flex">
                <h2>{item}</h2>
                {uniqueElement(item)
                  .filter((item) => typeof item !== "undefined")
                  .map((parItem) => {
                    return (
                      <label>
                        {parItem}
                        <input
                          type="checkbox"
                          onChange={() => handleCheckbox(item, parItem)}
                        />
                      </label>
                    );
                  })}
              </div>
            );
          }
        })}
        <div className="text">
          <input type="text" placeholder="Name" onInput={handleNameChange} />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            {useKeys.map((key) => {
              return <th>{key}</th>;
            })}
          </tr>
        </thead>

        <tbody>
          {FilterData.map((item) => (
            <tr>
              {useKeys.map((key) => (
                <td>{item[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
