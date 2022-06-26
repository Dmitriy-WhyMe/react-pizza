import React from 'react'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { setCategoryId, setCurrentPage, setFilters } from '../redux/filter/slice'
import { selectFilter } from '../redux/filter/selectors'
import Categories from '../components/Categories'
import Sort, { sortList } from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Pagination from '../components/Pagination'
import { fetchPizzas } from '../redux/pizza/slice'
import { SearchPizzaParams } from '../redux/pizza/types'
import { selectPizzaData } from '../redux/pizza/selectors'
import { useAppDispatch } from '../redux/store'

const Home: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const isSearch = React.useRef(false)
    const isMounted = React.useRef(false)
    const {categoryId, sort, currentPage, searchValue} = useSelector(selectFilter)
    const {items, status} = useSelector(selectPizzaData)

    const onChangeCategory = React.useCallback((id: number) => {
        dispatch(setCategoryId(id))
    }, [])
    const onChangePage = (number: number) => {
        dispatch(setCurrentPage(number))
    }

    const getPizzas = async () => {
        const category = categoryId > 0 ? `category=${categoryId}`: ''
        const search = searchValue ? `&search=${searchValue}`: ''
        const sortBy = sort.sortProperty.replace('-','')
        const order = sort.sortProperty.includes('-') ? 'acs' : 'desc'

        dispatch(
            fetchPizzas({
                category,
                search,
                sortBy,
                order,
                currentPage: String(currentPage)
            })
        )
        window.scrollTo(0, 0)
    }
    /*
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
            const params = (qs.parse(window.location.search.substring(1)) as unknown) as SearchPizzaParams
            const sort = sortList.find((obj) => obj.sortProperty === params.sortBy)
            dispatch(setFilters({
                searchValue: params.search,
                categoryId: Number(params.category),
                currentPage: Number(params.currentPage),
                sort: sort || sortList[0]
            }))
            isSearch.current = true
        }
        // eslint-disable-next-line 
    }, [])
    */
    React.useEffect(() => {
        window.scrollTo(0, 0)
        getPizzas()
        //isSearch.current = false
        // eslint-disable-next-line 
    }, [categoryId,sort.sortProperty,searchValue,currentPage])
    
    const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj}/>)
    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>)

    return (
        <>
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={onChangeCategory}/>
                <Sort value={sort}/>
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
