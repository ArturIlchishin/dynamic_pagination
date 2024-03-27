import {Route, Routes} from "react-router-dom";
import {HelloComponent} from "../HelloComponent";
import {CommentsComponent} from "../CommentsComponent";
import {SinglePostComponent} from "../SinglePostComponent";

export const AppRouter = () => {
    return (
        <Routes>
            <Route path={'/'} element={<HelloComponent />} />
            <Route path={'/comments'} element={<CommentsComponent />} />
            <Route path={'/comments/:id'} element={<SinglePostComponent />} />
        </Routes>
    )
}