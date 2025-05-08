import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { array, object, string } from "yup";
import RecipesStore, { RecipeType } from "../store/recipesStore";
import { Box, Modal, Typography, Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { UserContext } from "./AppLayout";
import { FoodBank, AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';

const schema = object({
  title: string().required('Title is required'),
  description: string().required(),
  ingredients: array().required('Ingredients are required'),
  instructions: string().required('Instructions are required')
});

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
  border: '2px solid #d32f2f', // צבע אדום
};

const inputWrapper = {
  marginBottom: '16px',
};

const inputStyle = {
  color: '#555',
};

const ingredientWrapper = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '10px',
  color: 'red',
};

const iconButtonStyle = {
  marginLeft: '10px',
  padding: '5px 10px',
  color: '#d32f2f', // צבע אדום
};

const submitButtonStyle = {
  marginTop: '20px',
  width: '100%',
  padding: '10px',
  fontSize: '18px',
  color: 'white',
  backgroundColor: '#d32f2f',
  fontWeight: 'bold',
  borderRadius: '8px',
  '&:hover': {
    backgroundColor: '#b71c1c', // אפקט hover
  },
};

const AddRecipe = () => {
  const [click, setclick] = useState(false);
  const context = useContext(UserContext);

  const { register, handleSubmit, reset, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients"
  });

  const onSubmit: SubmitHandler<Partial<RecipeType>> = (data) => {
    setclick(false);
    RecipesStore.setId(context?.user.id);
    RecipesStore.addRecipe(data);
    reset();
  };

  return (
    <>
      <Box 
        display="flex" 
        justifyContent="center" 
        p={2} 
        sx={{
          position: 'fixed', 
          top: 350, 
          left: '900px', 
          transform: 'translateX(-50%)',
          color: 'white',
          backgroundColor: '#d32f2f',
          padding: '10px 20px',
          borderRadius: '50px',
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: '#b71c1c',
          },
        }}
        onClick={() => setclick(true)}
      >
        <Typography variant="h6" component="span" sx={{ fontWeight: 'bold' }}>
          🍽️ Add a New Recipe 🍽️
        </Typography>
      </Box>

      {click &&
        <Modal
          open={click}
          onClose={() => { setclick(false); }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2" align="center" color="primary">
              <FoodBank sx={{ fontSize: 40, marginBottom: 2 }} />
              <form onSubmit={handleSubmit(onSubmit)}>
                <div style={inputWrapper}>
                  <TextField
                    {...register('title')}
                    label="Title"
                    fullWidth
                    error={!!errors.title}
                    helperText={errors.title ? errors.title.message : ''}
                    variant="outlined"
                    margin="normal"
                    InputProps={{ style: inputStyle }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderColor: '#d32f2f',
                        borderRadius: '8px',
                      },
                    }}
                  />
                </div>

                <div style={inputWrapper}>
                  <TextField
                    {...register('description')}
                    label="Description"
                    fullWidth
                    error={!!errors.description}
                    helperText={errors.description ? errors.description.message : ''}
                    variant="outlined"
                    margin="normal"
                    InputProps={{ style: inputStyle }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderColor: '#d32f2f',
                        borderRadius: '8px',
                      },
                    }}
                  />
                </div>

                <div style={inputWrapper}>
                  {fields.map((item, index) => (
                    <div key={item.id} style={ingredientWrapper}>
                      <TextField
                        {...register(`ingredients.${index}`)}
                        label="Ingredient"
                        fullWidth
                        error={!!errors.ingredients?.[index]}
                        helperText={errors.ingredients?.[index] ? 'This field is required' : ''}
                        variant="outlined"
                        margin="normal"
                        InputProps={{ style: inputStyle }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderColor: '#d32f2f',
                            borderRadius: '8px',
                          },
                        }}
                      />
                      <Button
                        type="button"
                        onClick={() => remove(index)}
                        variant="contained"
                        color="error"
                        style={iconButtonStyle}
                      >
                        <RemoveCircleOutline />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    onClick={() => append('')}
                    variant="contained"
                    color="primary"
                    style={iconButtonStyle}
                  >
                    <AddCircleOutline /> Add Ingredient
                  </Button>
                </div>

                <div style={inputWrapper}>
                  <TextField
                    {...register('instructions')}
                    label="Instructions"
                    fullWidth
                    error={!!errors.instructions}
                    helperText={errors.instructions ? errors.instructions.message : ''}
                    variant="outlined"
                    margin="normal"
                    InputProps={{ style: inputStyle }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderColor: '#d32f2f',
                        borderRadius: '8px',
                      },
                    }}
                  />
                </div>

                <Button type="submit" variant="contained" style={submitButtonStyle}>
                  Save Recipe
                </Button>
              </form>
            </Typography>
          </Box>
        </Modal>
      }
    </>
  );
};

export default AddRecipe;
