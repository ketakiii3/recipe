// src/lib/gifs.ts

// This is the updated collection of GIFs for random use throughout the app.
export const cuteAnimalGifs = [
    'https://media.tenor.com/5V2a8Y23-dAAAAAC/cooking.gif',
    'https://media.tenor.com/i-pD1CgZ8K0AAAAC/chef-pwaty-cooking.gif',
    'https://media.tenor.com/uNEaPEiVp0MAAAAC/cat-huh.gif',
    'https://media.tenor.com/9C8yBfFwAjoAAAAC/emmytesting586.gif',
    'https://media.tenor.com/G5qWz5Lg1aIAAAAC/birbhaus-cooking.gif',
    'https://media.tenor.com/mO0Wd_VAP3YAAAAC/chefcat-cat.gif',
    'https://media.tenor.com/ax9j6iB47lAAAAAC/tkthao219-peach.gif',
    'https://media.tenor.com/T09pW4vI-K0AAAAC/cat-cooking-let-me-cook-cat.gif',
  ];
  
  // This function selects and returns a random GIF from our collection.
  export const getRandomGif = () => {
    // This calculates a random index number based on the array's length.
    const randomIndex = Math.floor(Math.random() * cuteAnimalGifs.length);
    // This returns the GIF URL at that random index.
    return cuteAnimalGifs[randomIndex];
  };