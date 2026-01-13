// utils/findShloka.js
import gita from "../data/gita.json";

export function findShloka(message) {
  const text = message.toLowerCase().trim();

  const lettersOnly = text.replace(/[^a-zA-Z ]/g, "");
  if (text.length < 3 || lettersOnly.length < text.length * 0.4) {
    return {
      isFallback: true,
      message:
        "🙏 I couldn’t understand your feelings clearly.\nPlease share your thoughts in simple words — Krishna is listening with love. 💛",
    };
  }

  let bestMatch = null;
  let highestScore = 0;

  for (let verse of gita) {
    let score = 0;
    for (let kw of verse.keywords) {
      if (text.includes(kw.toLowerCase())) score++;
    }
    if (score > highestScore) {
      highestScore = score;
      bestMatch = verse;
    }
  }

  if (!bestMatch || highestScore === 0) {
    return {
      isFallback: true,
      message:
        "🙏 I couldn’t understand your feelings clearly.\nPlease share your thoughts in simple words — Krishna is listening with love. 💛",
    };
  }

  return {
    ...bestMatch,
    isFallback: false,
  };
}
