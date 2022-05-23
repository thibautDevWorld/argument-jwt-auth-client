


function CreateFolderPage() {






    return (
        <div className="create-folder-page">

            <p>This is the create folder page</p>

            <label htmlFor="cars">Choose a theme:</label>

            <select name="themes" id="themes">
                <option value="Politic">Politic</option>
                <option value="People">People</option>
                <option value="Health">Health</option>
                <option value="Cooking">Cooking</option>
                <option value="Sport">Sport</option>
                <option value="Fashion">Fashion</option>
            </select>
        </div>
    )
}


export default CreateFolderPage;