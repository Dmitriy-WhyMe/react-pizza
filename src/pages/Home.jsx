import React from 'react'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'

import { useSelector, useDispatch  } from 'react-redux'
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice'
import Categories from '../components/Categories'
import Sort, { sortList } from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock/'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Pagination from '../components/Pagination'
import { SearchContext } from '../App'
import { fetchPizzas } from '../redux/slices/pizzaSlice'


function Home() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isSearch = React.useRef(false)
    const isMounted = React.useRef(false)
    const {categoryId, sort, currentPage} = useSelector(state => state.filter)
    const {items, status} = useSelector(state => state.pizza)
    const {searchValue} = React.useContext(SearchContext)

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
    }
    const onChangePage = number => {
        dispatch(setCurrentPage(number))
    }

    const getPizzas = async () => {
        const category = categoryId > 0 ? `category=${categoryId}`: ''
        const search = searchValue ? `&search=${searchValue}`: ''
        const sortBy = sort.sortProperty.replace('-','')
        const order = sort.sortProperty.includes('-') ? 'acs' : 'desc'

        dispatch(fetchPizzas({
            category,
            search,
            sortBy,
            order,
            currentPage
        }))
        window.scrollTo(0, 0)
    }

    React.useEffect(() => {
        if(isMounted.current){
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                currentPage,
                categoryId
            })
            navigate(`?${queryString}`)
        }
        isMounted.current = true
        // eslint-disable-next-line 
    }, [categoryId,sort.sortProperty,currentPage])

    React.useEffect(() => {
        if(window.location.search){
            const params = qs.parse(window.location.search.substring(1))
            const sort = sortList.find(obj => obj.sortProperty === params.sortProperty)
            dispatch(setFilters({
                ...params,
                sort
            }))
            isSearch.current = true
        }
        // eslint-disable-next-line 
    }, [])
    
    React.useEffect(() => {
        window.scrollTo(0, 0)
        getPizzas()
        isSearch.current = false
        // eslint-disable-next-line 
    }, [categoryId,sort.sortProperty,searchValue,currentPage])

    

    const pizzas = items.map(obj => <PizzaBlock key={obj.id} {...obj}/>)
    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>)

    return (
        <>
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={onChangeCategory}/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {status === 'error'
                 ? <div>Ошибка загрузки пицц</div>
                 : <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
            }
            <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
        </>
    )
}

export default Home
