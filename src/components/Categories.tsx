import React from 'react'

type CategoriesProps = {
  value: number,
  onChangeCategory: any
}

const Categories: React.FC<CategoriesProps> = ({value,onChangeCategory}) => {
  const categories = ["Все","Мясные","Вегетарианская","Гриль","Острые","Закрытые"]

  return (
    <div className="categories">
        <ul>
          {
            categories.map((categoryName, index) => (
              <li onClick={()=>onChangeCategory(index)} key={index} className={value === index ? 'active' : ''}>{categoryName}</li>
            ))
          }
            
        </ul>
    </div>
  )
}

export default Categories