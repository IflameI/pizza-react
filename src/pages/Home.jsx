import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Categories, PizzaBlock, SortPopup } from '../components';
import LoadingBlock from '../components/PizzaBlock/LoadingBlock';

import { setCategory, setSortBy } from '../redux/actions/filters';
import { fetchPizzas } from '../redux/actions/pizzas';

const categoryNames = ['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
const sortItems = [
  { name: 'популярности', type: 'popular', order: 'desc' },
  { name: 'цене', type: 'price', order: 'desc' },
  { name: 'алфавиту', type: 'name', order: 'asc' },
];

const Home = () => {
  const dispatch = useDispatch();

  const { items, isLoaded, category, sortBy, cartItems } = useSelector(
    ({ pizzas, cart, filters }) => {
      //replace use state to destruction
      return {
        items: pizzas.items, //именно за этими свойствами мы следим
        isLoaded: pizzas.isLoaded,
        category: filters.category,
        sortBy: filters.sortBy,
        cartItems: cart.items,
      };
    },
  );

  const onSelectCategory = React.useCallback((index) => {
    dispatch(setCategory(index));
  }, []);
  const onSelectSortType = React.useCallback((type) => {
    dispatch(setSortBy(type));
  }, []);

  const handleAddPizzaToCart = (obj) => {
    dispatch({
      type: 'ADD_PIZZA_CART',
      payload: obj,
    });
  };

  useEffect(() => {
    dispatch(fetchPizzas(sortBy, category));
  }, [category, sortBy]);

  return (
    <div className='content'>
      <div className='container'>
        <div className='content__top'>
          <Categories
            activeCategory={category}
            onClickCategory={onSelectCategory}
            items={categoryNames}
          />
          <SortPopup
            onClickSortPopup={onSelectSortType}
            activeSortType={sortBy.type}
            popups={sortItems}
          />
        </div>
        <h2 className='content__title'>Все пиццы</h2>
        <div className='content__items'>
          {isLoaded
            ? items.map((obj) => (
                <PizzaBlock
                  addedCount={cartItems[obj.id] && cartItems[obj.id].items.length}
                  onClickAddPizza={handleAddPizzaToCart}
                  key={obj.id}
                  {...obj}
                /> // === name = {obj.name}, imageUrl = {obj.imageUrl}...
              ))
            : Array(12)
                .fill(0)
                .map((_, index) => <LoadingBlock key={index} />)}
        </div>
      </div>
    </div>
  );
};

export default Home;
