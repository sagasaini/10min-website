import { FiSearch } from "react-icons/fi"

const SearchBox = () => {
  return (
    <div className="_searchbox">
      <FiSearch  style={{position:'absolute', right:'50px'}}
        className=" top-1/2 -translate-y-1/2  text-gray-400"
        size={24}
      />
      <input
        type="text"
        placeholder="Search for products"
        className="outline-none w-full text-[25px]"
      />
    </div>
  )
}

export default SearchBox
