import { useContext, useState } from "react"
import RecipesStore, { RecipeType } from "../store/recipesStore";
import { UserContext } from "./AppLayout"
import { observer } from "mobx-react-lite";
import UpdateOneRecipe from "./UpdateOneRecipe";
export default observer(() => {
   RecipesStore.getRecipes();
    const[ok,setok]=useState(false)
    const context=useContext(UserContext)
    const [selectedRecipe, setSelectedRecipe] = useState<RecipeType | null>(null);
    const [isUpdating, setIsUpdating] = useState(false);
 const x= context?.user.id
    const handleUpdate = () => {
      setIsUpdating(true);
    };

    const filteredRecipes = RecipesStore.list.filter(
        (recipe) => recipe.authorId ===x
  
      );
     return(<>
   {filteredRecipes.map((recipe) => (
        <div key={recipe.id}> {recipe.title} 
        <button onClick={handleUpdate}>upate</button></div>
     
         // מציגים רק את ה-title של המתכונים שהתנאי מתאים להם
      ))}
           <div>

    {isUpdating && <UpdateOneRecipe />}
  </div>

   </>)
 
            });