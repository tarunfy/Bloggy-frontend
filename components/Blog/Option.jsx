const Option = ({ filterBy, setFilterBy, name }) => {
  return (
    <>
      <h3
        className={`${
          filterBy === name ? "font-bold" : "font-normal"
        } hover:text-[#7f5dde] text-xl transition cursor-pointer`}
        onClick={() => setFilterBy(name)}
      >
        {name}
      </h3>
    </>
  );
};

export default Option;
