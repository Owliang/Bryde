import React from 'react'

export default function Rating(props) {
    const {rating} = props;
    return(
        <div>
            <span>
                <i
                    className={
                        rating >= 2
                        ? 'fa fa-star'
                        : rating >= 1
                        ? 'fa fa-star-half-o'
                        : 'fa fa-star-o'
                    }
                ></i>
            </span>
            <span>
                <i
                    className={
                        rating >= 4
                        ? 'fa fa-star'
                        : rating >= 3
                        ? 'fa fa-star-half-o'
                        : 'fa fa-star-o'
                    }
                ></i>
            </span>
            <span>
                <i
                    className={
                        rating >=6
                        ? 'fa fa-star'
                        : rating >=5
                        ? 'fa fa-star-half-o'
                        : 'fa fa-star-o'
                    }
                ></i>
            </span>
            <span>
                <i
                    className={
                        rating >= 8
                        ? 'fa fa-star'
                        : rating >=7
                        ? 'fa fa-star-half-o'
                        : 'fa fa-star-o'
                    }
                ></i>
            </span>
            <span>
                <i
                    className={
                        rating >= 10
                        ? 'fa fa-star'
                        : rating >=9
                        ? 'fa fa-star-half-o'
                        : 'fa fa-star-o'
                    }
                ></i>
            </span>
        </div>
    )
}