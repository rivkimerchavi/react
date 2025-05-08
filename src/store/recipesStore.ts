import axios from "axios";
import { action, computed, makeAutoObservable, makeObservable, observable } from "mobx";
import { useContext } from "react";


export type RecipeType = {
    id: string,
    title: string,
    description: string,
    authorId : string,
    ingredients: string[],
    instructions: string,
}

class RecipesStore {
    otherId!:string
    list: RecipeType[] = []
  
    constructor() {
        
        makeAutoObservable(this)
    
    }
setId(id:string)
{
    this.otherId=id
}
     async addRecipe(recipe: Partial<RecipeType>) {
  
        try {
            const res = await axios.post('http://localhost:3000/api/recipes', {
                title:recipe.title,
                description:recipe.description,
                ingredients:recipe.ingredients,
                instructions:recipe.instructions
            },{
            headers:{
                'user-id':this.otherId
            }
          
         } ) 
       }
  
        catch(e)
       {
        alert(e)
      }
}
    
async  getRecipes() {
        try{
      const res=await axios.get('http://localhost:3000/api/recipes')
      this.list=res.data
    
        }
        catch(e)
        {
            console.log(e)
       }
    }

}

export default new RecipesStore()