import '../styles/App.scss';
import { useEffect, useState } from 'react';
import callToApi from '../services/api';
import ls from '../services/localStorage';

function App() {
  const [seriesSearch, setSereiesSearch] = useState([]);
  const [favSeries, setFavSeries] = useState(ls.get('data', []));
  const [userInput, setUserInput] = useState('');
  const [searchName, setSearchName] = useState('');
  const [isRenderSearch, setIsRenderSearch] = useState(false);

  useEffect(() => {
    callToApi(searchName).then((response) => {
      setSereiesSearch(response);
    });
  }, [searchName]);

  useEffect(() => {
    ls.set('data', favSeries);
  }, [favSeries]);

  const handleSearchName = (ev) => {
    setUserInput(ev.currentTarget.value.toLowerCase());
  };

  const handleClickSearch = (ev) => {
    ev.preventDefault();
    setSearchName(userInput);
    setIsRenderSearch(!isRenderSearch);
  };
  const handleClickDelete = (ev) => {
    ev.preventDefault();
    setUserInput('');
    setIsRenderSearch(false);
  };

  const handleFavorite = (ev) => {
    const clickSerieId = parseInt(ev.currentTarget.id); //quiero el Li
    const favourite = seriesSearch.find((serie) => serie.id === clickSerieId);
    console.log('clickSerieId', clickSerieId);
    console.log('favSerie', favourite);
    console.log('seriesSearch', seriesSearch);
    setFavSeries([...favSeries, favourite]);
    console.log('favSeries', favSeries);
  };

  const renderSeries = () => {
    if (isRenderSearch) {
      return seriesSearch.map((serie) => {
        return (
          <li
            key={serie.id}
            id={serie.id}
            className="card"
            onClick={handleFavorite}
          >
            <div className="frameImage">
              <img
                className="card__image"
                src={serie.image}
                alt={serie.title}
              />
            </div>
            <h3 className="card__title3">{serie.title}</h3>
          </li>
        );
      });
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1 className="title1 ">Busca tus series favoritas de anime</h1>
      </header>
      <main>
        <form className="form" action="">
          <input
            className="inputSerieUser"
            type="text"
            name="search"
            id="search"
            placeholder="Introduce un título"
            value={userInput}
            onChange={handleSearchName}
          />
          <input
            className="button"
            type="button"
            value="Buscar"
            onClick={handleClickSearch}
          />
          <input
            className="button"
            type="reset"
            value="Borrar"
            onClick={handleClickDelete}
          />
        </form>
        <section className="viewCards">
          <aside className="favourites">
            <h2 className="title2">Series favoritas</h2>

            <ul className="listCards"></ul>
            <button className="button">Borrar Favoritas</button>
          </aside>
          <section className="results">
            <h2 className="title2">Resultados</h2>
            <div>
              <p className="paragraph js_searchNotFound"></p>
              <ul className="listCards "> {renderSeries()}</ul>
            </div>
          </section>
        </section>
      </main>
      <footer className="footer">
        <p>Espero que te haya gustado</p>
        <i className="fa-solid fa-heart"></i>
      </footer>
    </div>
  );
}

export default App;
