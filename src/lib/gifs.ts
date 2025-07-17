// src/lib/gifs.ts

// This is the updated collection of GIFs for random use throughout the app.
export const cuteAnimalGifs = [
    'https://tenor.com/en-GB/view/cat-huh-tired-exhausted-gif-6485465384176810832',
    'https://tenor.com/en-GB/view/emmytesting586-gif-10800793942039113409',
    'https://tenor.com/en-GB/view/cooking-gif-2970283722082638544',
    'https://tenor.com/en-GB/view/chefcat-cat-chef-cat-kitchen-cat-cooking-cat-in-hat-gif-20152387',
    'https://tenor.com/en-GB/view/tkthao219-peach-goma-gif-27290245',
    'https://tenor.com/en-GB/view/birbhaus-cooking-cute-gif-18442661682198157862',
    'https://tenor.com/en-GB/view/cat-cooking-let-me-cook-cat-let-me-cook-let-him-cook-gif-14801096915973119105'
  ];
  
  // This function selects and returns a random GIF from our collection.
  export const getRandomGif = () => {
    // This calculates a random index number based on the array's length.
    const randomIndex = Math.floor(Math.random() * cuteAnimalGifs.length);
    // This returns the GIF URL at that random index.
    return cuteAnimalGifs[randomIndex];
  };