import { RecipeType } from "../store/recipesStore"

const Recipe = observer(({ recipe }: { recipe:  RecipeType}) => {
    return (<>
        <div>
            <label>
             {recipe.authorId}
             {recipe.title}
             {recipe.id}
             {recipe.ingredients}
             {recipe.instructions}
                
            </label>
        </div>
    </>)
})