import React from 'react'

import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock/'
import Skeleton from '../components/PizzaBlock/Skeleton'

function Home() {

    const [items, setItems] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [categoryId, setCategoryId] = React.useState(0)
    const [sortType, setSortType] = React.useState({
        name: 'популярности',
        sortProperty: 'rating',
    })

    React.useEffect(() => {
        setIsLoading(true)

        const category = categoryId > 0 ? `category=${categoryId}`: ''
        const sortBy = sortType.sortProperty.replace('-','')
        const order = sortType.sortProperty.includes('-') ? 'acs' : 'desc'

        fetch(`https://628f92a1dc478523654307e6.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}
        `)
        .then((res) => res.json()) 
        .then(arr => {
            setItems(arr)
            setIsLoading(false)
        })
        window.scrollTo(0, 0)
    }, [categoryId,sortType])

    return (
        <>
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={(index)=>setCategoryId(index)}/>
                <Sort value={sortType} onChangeSort={(index)=>setSortType(index)}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading 
                    ? [...new Array(6)].map((_, index) => <Skeleton key={index}/>) 
                    : items.map(obj => <PizzaBlock key={obj.id} {...obj}/>)
                }
            </div>
        </>
    )
}

export default Home
