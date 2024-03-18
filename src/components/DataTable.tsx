const DataTable = (props: any) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              {props.headings.map((heading: any, i: any) => (
                <th
                  key={i}
                  className={`py-4 px-4 font-medium text-black dark:text-white ${
                    i === 0 ? 'pl-9' : ''
                  }`}
                >
                  {heading.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {props.data.map((row: any, i: any) => (
              <tr
                key={i}
                className={`border-b border-[#eee] dark:border-strokedark ${
                  i % 2 === 0
                    ? 'bg-white dark:bg-boxdark'
                    : 'bg-gray-2 dark:bg-boxdark'
                }`}
              >
                {props.headings.map((heading: any, i: any) => (
                  <td
                    key={i}
                    className={`py-5 px-4 ${
                      i === 0 ? 'pl-9' : ''
                    } dark:border-strokedark`}
                  >
                    {row[heading.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
