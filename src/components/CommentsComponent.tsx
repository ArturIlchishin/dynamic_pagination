import {AnimatedComponent} from "./AnimatedComponent";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import './styles.css'

//Типизируем каждый из элементов массива comments
export interface IComments {
    body: string
    id: number
    title: string
    userId: number
}

export const CommentsComponent = () => {
    const [comments, setComments] = useState<IComments[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [requesting, setRequest] = useState<boolean>(true);
    const navigate = useNavigate();

    //При рендере компонента, через нативный фетч запрашиваем посты с сервера, полученные данные сохраняем в стейт comments
    useEffect(() => {
        //Каждый раз, когда состояние requesting будет меняться, происходит запрос на сервер
        if (requesting) {
            fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${currentPage}`)
                .then((data) => {
                    data.json().then((posts) => {
                        //Склеиваем массивы comments и posts при помощи спред-оператора
                        setComments([...comments, ...posts]);
                        setCurrentPage((currentPage) => currentPage + 1);
                        setRequest(false);
                    })
                })
        }}, [requesting]);

    useEffect(() => {
            document.addEventListener('scroll', handleScroll)
    return () => {
            document.removeEventListener('scroll', handleScroll)
        };
    }, [currentPage]);

    const sendRequestAndChangeUrl = () => {
        setRequest((prevState) => true);
        try {
            const link = document.createElement('a')
            link.href = `#${currentPage}`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        } catch (error) {
            console.error(error)
        }
    };

    const handleScroll = (e: any): void => {
        //Общая высота страницы с учетом скролла
        const totalHeight = e.target.documentElement.scrollHeight;
        //Текущее положение скролла от ВЕРХА страницы
        const scrollFromTop = e.target.documentElement.scrollTop;
        //Высота видимой области страницы
        const windowHeight = window.innerHeight;

        if (totalHeight - (scrollFromTop + windowHeight) < 100 && currentPage <= 5) {
            sendRequestAndChangeUrl();
        }
    };

    const handleClick = () : void => {
        if(currentPage >= 5 && currentPage <=10) {
            sendRequestAndChangeUrl();
        }
    };

    return (
            <AnimatedComponent>
                {comments.map((item) =>
                        <section key={item.id} className={'comment__container'}
                                 onClick={() => navigate(`/comments/${item.id}`)}>
                            <div className={'comment__title'}>
                                <h2 className={'comment__title-text'}>{item.title}</h2>
                            </div>
                            <div className={'comment__body'}>
                                <p className={'comment__body-text'}>{item.body}</p>
                            </div>
                        </section>
                )}
                <div className={'comments__button__container'}>
                    <button className={`button ${currentPage > 5 && currentPage <=10 ? 'visible' : ''}`}
                            onClick={ handleClick }>Show more</button>
                </div>
            </AnimatedComponent>
    )
}
