import { SubmitHandler, useFieldArray, useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import { array, object, string } from "yup"
import RecipesStore, { RecipeType } from "../store/recipesStore"
import { Box, Modal, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { UserContext } from "./AppLayout";


const schema = object({
    title: string().required('it count '),
    description: string().required().length(10, 'description nust be 10 letter'),
    ingredients:array(),
    instructions:string()
   
})
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
 
const UpdateOneRecipe= () => 
 {
   const [click,setclick]=useState(false)
   const context=useContext(UserContext)
        const onSubmit: SubmitHandler<Partial< RecipeType> >= (data) => {
        setclick(false)
        RecipesStore.setId(context?.user.id)
        RecipesStore.addRecipe(data)
            reset()
        }
    
        const {
            register,
            handleSubmit,
            reset,
            control,
            watch,
            formState: { errors }
        } = useForm({ resolver: yupResolver(schema) })
        const { fields, append, remove } = useFieldArray({
            control,
            name: "ingredients" // Ensure this is spelled correctly
        });
    return (<>
  <Box display="flex" justifyContent="flex-first" p={2} sx={{  position: 'fixed', top: 0, left: 150 }}>
                  <button   onClick={() => setclick(true)}>add recipe</button>
            </Box>
            {click &&
              <Modal
                open={click}
                onClose={() => { setclick(false) }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
        <form onSubmit={handleSubmit(onSubmit)}>
            <div> <input {...register('title')} placeholder="title" />
                {errors.title && <span>{errors.title.message}</span>}</div>
            <div><input {...register('description')} placeholder="description" />
                {errors.description && <span>{errors.description.message}</span>}</div>
                <div>
                    {fields.map((item, index) => (
                        <div key={item.id}>
                            <input
                                {...register(`ingredients.${index}`)} // Register input for ingredients
                                placeholder="Ingredient"
                            />
                            <button type="button" onClick={() => remove(index)}>Remove</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => append('')}>Add Ingredient</button>
                    {errors.ingredients && <span>{errors.ingredients.message}</span>}
                </div>
                <div><input {...register('instructions')} placeholder="instructions" />
                {errors.instructions && <span>{errors.instructions.message}</span>}</div>
            <button type="submit">Save</button>
        </form>
        </Typography>
        
        </Box>
      </Modal>
    }
    </>)
}
 export default UpdateOneRecipe