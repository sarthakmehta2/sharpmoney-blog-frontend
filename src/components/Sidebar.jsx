export function Sidebar({onCreatepost, onManagepost}){
    return(
        <div>
            <button onClick={onCreatepost}>Create a New Post</button>
            <button onClick={onManagepost}>Manage Posts</button>
        </div>
    )

}