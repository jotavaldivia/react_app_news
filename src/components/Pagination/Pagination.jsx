import {useState} from 'react'
import './Pagination.css'
const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
const [active, setActive] = useState(null);
const pageNumbers = [];

const changeStyle = (index) => {
  setActive(index );
};

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map((number, index )=> (
          <li key={number}  className={`${
            active === index ? "active" : "disabled"
          }`}>
            <a onClick={(e) =>{
            
               paginate(number)
               changeStyle(index)
            }}

           
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;