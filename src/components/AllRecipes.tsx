import { useState } from "react";
import { observer } from "mobx-react-lite";
import RecipesStore, { RecipeType } from "../store/recipesStore";

// שימוש באייקונים (אפשר לשנות את האייקונים לפי העדפותיך)
import { FaUtensils, FaListAlt, FaHeart } from 'react-icons/fa';

export default observer(() => {
    RecipesStore.getRecipes();
    const [selectedRecipe, setSelectedRecipe] = useState<RecipeType | null>(null);

    const handleRecipeClick = (recipe: RecipeType) => {
        setSelectedRecipe(recipe);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Arial, sans-serif' }}>
            {/* צד ימין - רשימת המתכונים */}
            <div style={{
                width: '30%',
                position: 'fixed',
                right: '10px',
                top: '10%', // שיניתי ל-10% כך שזה יהיה יותר למעלה
                overflowY: 'auto',
                maxHeight: '70vh',
                borderRadius: '8px',
                padding: '20px',
                backgroundColor: '#f8f8f8',
                boxShadow: '0px 4px 10px rgba(0,0,0,0.1)'
            }}>
                <h2 style={{ color: '#d32f2f', fontSize: '24px', marginBottom: '15px', textAlign: 'center' }}>רשימת המתכונים</h2>

                {RecipesStore.list.map((t) => (
                    <button
                        onClick={() => handleRecipeClick(t)}
                        key={t.id}
                        style={{
                            backgroundColor: '#d32f2f', // הצבע האדום החדש
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            padding: '10px',
                            marginBottom: '10px',
                            width: '100%',
                            textAlign: 'left',
                            fontSize: '18px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            transition: 'all 0.3s ease',
                        }}
                    >
                        {/* האייקון ליד כל מתכון */}
                        <FaUtensils style={{ marginRight: '10px', fontSize: '24px' }} /> {/* הגדלתי את האייקון */}
                        {t.title}
                    </button>
                ))}
            </div>

            {/* צד שמאל - פרטי המתכון */}
            <div style={{
                width: '65%',
                position: 'fixed',
                left: '10px',
                top: '10%',
                maxWidth: '60%',
                overflowY: 'auto',
                padding: '20px',
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                boxShadow: '0px 4px 15px rgba(0,0,0,0.1)',
                display: selectedRecipe ? 'block' : 'none',
                marginTop: '10%'
            }}>
                {selectedRecipe && (
                    <div>
                        {/* הצגת האייקון עם שם המתכון */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            marginBottom: '20px'
                        }}>
                            <FaUtensils style={{
                                fontSize: '40px', // מגדילים את האייקון
                                color: '#d32f2f',
                                marginRight: '15px'
                            }} />
                            <h2 style={{ color: '#d32f2f', fontSize: '28px' }}>{selectedRecipe.title}</h2>
                        </div>

                        <p style={{ fontSize: '18px', color: '#333' }}><strong>תיאור:</strong> {selectedRecipe.description}</p>
                        <p style={{ fontSize: '18px', color: '#333' }}><strong>מרכיבים:</strong> {selectedRecipe.ingredients.join(', ')}</p>
                        <p style={{ fontSize: '18px', color: '#333' }}><strong>הוראות הכנה:</strong> {selectedRecipe.instructions}</p>
                    </div>
                )}
            </div>
        </div>
    );
});
