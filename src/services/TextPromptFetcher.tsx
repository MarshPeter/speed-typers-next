const prompts = [
  "Write a compelling narrative about a mysterious package left unattended on a doorstep in the dead of night, shrouded in the eerie glow of a flickering street lamp, its contents unknown but tinged with an air of intrigue and suspense.",
  "Describe in vivid detail the unsettling sensation of walking alone through a dense fog that blankets the world in a thick, swirling mist, obscuring visibility and muffling all sound except for the echo of your own footsteps, creating an atmosphere of eerie isolation and uncertainty.",
  "Imagine stumbling upon an ancient map hidden away in the dusty confines of an attic within the crumbling walls of a long-forgotten mansion, its yellowed parchment adorned with faded ink lines and cryptic symbols, hinting at long-lost treasures and forgotten secrets waiting to be unearthed by those brave enough to decipher its enigmatic clues.",
  "Craft a poignant tale of serendipity, where the chance encounter between two strangers on a crowded street sets into motion a chain of events that irrevocably alters the course of their lives, weaving together their fates in unexpected and profound ways, as they navigate the complexities of love, loss, and redemption.",
  "Explore the bittersweet emotions that accompany the departure of a loved one as they board a train bound for a distant land, their figure gradually disappearing into the horizon as the rhythmic chug of the locomotive fades into the distance, leaving behind a lingering sense of longing and anticipation for their eventual return.",
  "Create a vivid scene set within the vibrant hustle and bustle of a bustling marketplace, alive with the intoxicating aroma of spices, the melodic chatter of merchants hawking their wares, and the kaleidoscope of colors from exotic fabrics and gleaming trinkets, transporting visitors to a world of sensory delight and cultural immersion.",
  "Paint a hauntingly beautiful tableau of a solitary figure silhouetted against the backdrop of a crimson sky as they stand on the precipice of a towering cliff, the roaring surf below echoing the tumultuous turmoil of their inner thoughts, a silent witness to the passage of time and the vastness of the world beyond.",
  "Craft an epic saga of survival in a desolate post-apocalyptic world reclaimed by nature, where crumbling skyscrapers are overrun by tangled vines and rusting cars lie abandoned on silent highways, and humanity teeters on the brink of extinction as they struggle to carve out a new existence amidst the ruins of the old.",
  "Capture the raw power and majesty of a summer thunderstorm as it sweeps across the countryside, unleashing torrents of rain and jagged bolts of lightning that illuminate the darkened sky, the rumble of thunder echoing through the air like the growl of some primordial beast, a force of nature both awe-inspiring and terrifying in its fury.",
  "Describe the ethereal beauty of a starry night sky, where countless pinpricks of light twinkle overhead like diamonds scattered across a velvet canvas, and the quiet stillness of the night is broken only by the soft rustle of leaves in the breeze and the distant call of nocturnal creatures, enveloping the world in a tranquil embrace."
];

class PromptGenerator {
  private prompts: string[];

  constructor() {
    this.prompts = prompts;
  }

  public getPrompt() : string {
    const promptsLength = prompts.length;
    return this.prompts[Math.floor(Math.random() * promptsLength)];
  }
}

export default new PromptGenerator;