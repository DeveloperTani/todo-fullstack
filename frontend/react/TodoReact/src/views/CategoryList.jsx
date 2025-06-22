import '../styles/App.css'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import CategoryService from '../services/CategoryService'
import BackButton from '../components/BackButton'

const CategoryList = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    CategoryService.getAll().then(data => setCategories(data))
  }, [])

  return (
    <div>
      <h2>Categories</h2>
      <div className="category-list">
        {categories?.map((category) => (
          <div key={category.categoryId} className="category-item">
            <Link to={`/categories/${category.categoryId}`} className="category-link">
              <h4>{category.categoryName}</h4>
            </Link>
          </div>
        ))}
      </div>
      <BackButton />
    </div>
  )
}

export default CategoryList
