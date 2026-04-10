
import search from "./assets/images/icon-search.svg";
import "./css/Header.css";

function Header({ onhandleLocation, onKeyPress, location, setLocation, searchName, searchHistoryMenu, setSearchHistoryMenu }) {
  
  
  const handleSearchHistory =(name)=>{
    setLocation({ ...location, inputLocation: name })
    setSearchHistoryMenu(false)
  }
  
  return (
    <header>
      <h1>How's the sky looking today?</h1>
      <form onSubmit={(e) => onhandleLocation(e)}>
        <div className={searchHistoryMenu? 'inputs':""}>
          <div className="input">
          <img src={search} />
          <input
            type="text"
            onKeyDown={onKeyPress}
            placeholder={`Search for a place...`}
            value={
              location.inputLocation.charAt(0).toUpperCase() +
              location.inputLocation.slice(1)
            }
            onChange={(e) =>
              setLocation({ ...location, inputLocation: e.target.value })
            }
            onClick={(()=> setSearchHistoryMenu(!searchHistoryMenu))}
          />
        </div> 
        { searchHistoryMenu &&
        <div className="search-history">
          {searchName.map((name, index) => (
            <p key={index}  onClick={()=>handleSearchHistory(name)}>{name}</p>
          ))}
        </div>}
        </div>
        <button id="searchBtn">Search</button>
      </form>
    </header>
  );
}

export default Header;
