import {useEffect, useState} from "react";
import {AnimatedComponent} from "./AnimatedComponent";
import {IComments} from "./CommentsComponent";
import {useParams} from "react-router-dom";

export const SinglePostComponent = () => {

    const [posts, setPosts] = useState<IComments[]>([]);
    const {id} = useParams();

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json()
                .then((comments) => {setPosts(comments)}))
    }, []);

    return (
        <AnimatedComponent>
            {posts.filter((item, index) => index + 1 === Number(id)).map((post) =>
                <section key={post.id} className={'comment__container'}>
                    <div className={'comment__title'}>
                        <h2 className={'comment__title-text'}>{post.title}</h2>
                    </div>
                    <div className={'comment__body'}>
                        <p className={'comment__body-text'}>{post.body}</p>
                    </div>
                </section>
            )}
        </AnimatedComponent>
    )

}