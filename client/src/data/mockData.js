export const CATEGORIES = [
  { id: 'adventure',   label: 'Adventure & Outdoors',       sub: 'Hiking, wild swimming, exploring new places' },
  { id: 'social',      label: 'Social Dares',               sub: 'Strangers, solo outings, real connections' },
  { id: 'creative',    label: 'Creative',                   sub: 'Writing, drawing, music, making things' },
  { id: 'food',        label: 'Food & Drink',               sub: 'Cooking, trying new cuisines, bold bites' },
  { id: 'fitness',     label: 'Fitness',                    sub: 'New workouts, challenges, movement goals' },
  { id: 'learning',    label: 'Learning',                   sub: 'Docs, languages, skills, rabbit holes' },
  { id: 'mindfulness', label: 'Mindfulness & Wellness',     sub: 'Meditation, detox, journaling, rest' },
  { id: 'kindness',    label: 'Random Acts of Kindness',    sub: 'Anonymous gifts, letters, volunteering' },
  { id: 'tech',        label: 'Tech & Games',               sub: 'Games, no-phone challenges, building things' },
  { id: 'nostalgia',   label: 'Nostalgia',                  sub: 'Childhood hobbies, old movies, lost friends' },
  { id: 'photography', label: 'Photography & Observation',  sub: 'Documenting, noticing, capturing beauty' },
  { id: 'diy',         label: 'DIY & Making',               sub: 'Build, craft, fix, restore, create by hand' },
]

export const DIFFICULTIES = ['Easy', 'Medium', 'Hard', 'Mixed']
export const FREQUENCIES  = ['Daily', 'Every 2 Days', 'Weekly']

export const CHALLENGE_POOL = [
  /* ── Adventure & Outdoors ─────────────────────────────────────────────── */
  { id: 1,  title: 'Trail Untravelled',               category: 'Adventure & Outdoors', difficulty: 'Medium',    xp: 200, time: 120, description: 'Hike a trail you have never set foot on. No familiar paths — find somewhere completely new and see it through to the end.' },
  { id: 2,  title: 'Wild Swimmer',                    category: 'Adventure & Outdoors', difficulty: 'Hard',      xp: 320, time: 90,  description: 'Find a natural body of water — a lake, river, or sea — and swim in it. No heated pools. Just you and the wild.' },
  { id: 3,  title: 'Stargazer',                       category: 'Adventure & Outdoors', difficulty: 'Easy',      xp: 100, time: 60,  description: 'Drive or walk far enough from city lights to see the stars properly. Lie down, look up, and stay for at least 30 minutes.' },
  { id: 4,  title: 'Unknown Town',                    category: 'Adventure & Outdoors', difficulty: 'Medium',    xp: 220, time: 240, description: 'Spend a full day exploring a town or neighbourhood you have never visited. No plan, no agenda — just wander.' },
  { id: 5,  title: 'Sleep Under the Sky',             category: 'Adventure & Outdoors', difficulty: 'Hard',      xp: 350, time: 480, description: 'Camp overnight — your backyard, a campsite, or the wild. No hotel backup allowed. Wake up outside.' },
  { id: 6,  title: 'Sunrise Somewhere Scenic',        category: 'Adventure & Outdoors', difficulty: 'Medium',    xp: 180, time: 90,  description: 'Set an alarm, get up before dawn, and watch the sunrise from somewhere that deserves it. Photograph nothing — just watch.' },
  { id: 7,  title: 'Landmark You\'ve Ignored',        category: 'Adventure & Outdoors', difficulty: 'Easy',      xp: 90,  time: 60,  description: 'Find a local landmark, monument, or natural feature you\'ve always passed but never stopped at. Go there today.' },
  { id: 8,  title: 'Spontaneous Road Trip',           category: 'Adventure & Outdoors', difficulty: 'Hard', xp: 500, time: 480, description: 'Pick a direction. Drive for at least two hours with no destination in mind. Stop wherever feels right. Come home with a story.' },
  { id: 9,  title: 'Forager\'s Walk',                 category: 'Adventure & Outdoors', difficulty: 'Medium',    xp: 210, time: 120, description: 'Learn to identify three wild edibles in your region using an app or guide. Find them on a walk. Bonus: eat one safely.' },
  { id: 10, title: 'On the Water',                    category: 'Adventure & Outdoors', difficulty: 'Hard',      xp: 300, time: 150, description: 'Kayak, canoe, paddleboard, or row somewhere you\'ve never been on water before. No motorised boats.' },
  { id: 11, title: 'Sunset Walk',                     category: 'Adventure & Outdoors', difficulty: 'Easy',      xp: 80,  time: 45,  description: 'Take a walk timed to end exactly at sunset. No phone in hand. Watch the sky change until the last light is gone.' },
  { id: 12, title: 'Forest Bathing',                  category: 'Adventure & Outdoors', difficulty: 'Easy',      xp: 100, time: 60,  description: 'Spend one hour in a forest or dense woodland doing nothing but walking slowly and paying attention. Shinrin-yoku.' },

  /* ── Social Dares ─────────────────────────────────────────────────────── */
  { id: 13, title: 'Stranger Conversation',           category: 'Social Dares',         difficulty: 'Hard',      xp: 300, time: 30,  description: 'Strike up a genuine conversation with a complete stranger. Not small talk — find out something real about their life.' },
  { id: 14, title: 'Compliment Streak',               category: 'Social Dares',         difficulty: 'Easy',      xp: 90,  time: 30,  description: 'Give 3 sincere, specific compliments to 3 different people today. Make each one count — no "nice shoes" cop-outs.' },
  { id: 15, title: 'Solo Mission',                    category: 'Social Dares',         difficulty: 'Medium',    xp: 220, time: 180, description: 'Go somewhere you would normally only go with friends — alone. A restaurant, the cinema, a gig. Own it.' },
  { id: 16, title: 'Stranger in a Strange Room',      category: 'Social Dares',         difficulty: 'Hard',      xp: 320, time: 120, description: 'Attend a local event, meetup, or class where you know absolutely nobody. Talk to at least two people.' },
  { id: 17, title: 'Say Yes',                         category: 'Social Dares',         difficulty: 'Medium',    xp: 200, time: 60,  description: 'Say yes to the next social invite you would normally decline with an excuse. Show up. Stay the whole time.' },
  { id: 18, title: 'Life Story',                      category: 'Social Dares',         difficulty: 'Medium',    xp: 180, time: 60,  description: 'Ask someone — a colleague, an elder, a friend you\'ve known for years but never really asked — to tell you their life story. Just listen.' },
  { id: 19, title: 'Class Alone',                     category: 'Social Dares',         difficulty: 'Medium',    xp: 210, time: 90,  description: 'Join a community class — art, dance, cooking, pottery — solo. No safety blanket of a friend. Introduce yourself to someone.' },
  { id: 20, title: 'Five-Star Neighbour',             category: 'Social Dares',         difficulty: 'Easy',      xp: 80,  time: 20,  description: 'Leave a heartfelt, detailed review for a small local business that deserves more love. Make it specific and real.' },
  { id: 21, title: 'Neighbour You\'ve Never Met',     category: 'Social Dares',         difficulty: 'Medium',    xp: 190, time: 20,  description: 'Knock on a neighbour\'s door you\'ve never spoken to and introduce yourself. Exchange names at minimum.' },
  { id: 22, title: 'Vulnerable Share',                category: 'Social Dares',         difficulty: 'Hard',      xp: 350, time: 30,  description: 'Share something genuinely personal with someone you trust but haven\'t been fully open with. No deflecting with humour.' },
  { id: 23, title: 'Phone a Friend',                  category: 'Social Dares',         difficulty: 'Easy',      xp: 100, time: 30,  description: 'Call — actually call, don\'t text — a friend you haven\'t spoken to in at least 6 months. Catch up properly.' },

  /* ── Creative ─────────────────────────────────────────────────────────── */
  { id: 24, title: '10-Minute Poem',                  category: 'Creative',             difficulty: 'Easy',      xp: 90,  time: 10,  description: 'Write a poem in exactly 10 minutes. Set a timer. No editing after the buzzer. Whatever comes out, that\'s the poem.' },
  { id: 25, title: 'Wrong Hand',                      category: 'Creative',             difficulty: 'Easy',      xp: 80,  time: 20,  description: 'Draw something — a portrait, a scene, whatever you like — using only your non-dominant hand. No switching allowed.' },
  { id: 26, title: '30-Second Song',                  category: 'Creative',             difficulty: 'Medium',    xp: 220, time: 60,  description: 'Compose a 30-second melody or song. Record it on your phone. It doesn\'t have to be good — it has to be done.' },
  { id: 27, title: 'Found Art',                       category: 'Creative',             difficulty: 'Medium',    xp: 180, time: 45,  description: 'Take 5 household objects and turn them into something new — a sculpture, a photo, a collage. Use what\'s already there.' },
  { id: 28, title: '500-Word Story',                  category: 'Creative',             difficulty: 'Medium',    xp: 200, time: 60,  description: 'Write a complete short story in under 500 words. It needs a beginning, a middle, and an ending. No excerpts.' },
  { id: 29, title: 'One-Take Dance',                  category: 'Creative',             difficulty: 'Medium',    xp: 190, time: 30,  description: 'Choreograph a 30-second routine to a song you love and film it in one take. Post it or keep it — either way, do it.' },
  { id: 30, title: 'Memory Portrait',                 category: 'Creative',             difficulty: 'Easy',      xp: 100, time: 30,  description: 'Draw a self-portrait entirely from memory — no mirror, no photo. See what your mind thinks you look like.' },
  { id: 31, title: 'Outdoor Materials',               category: 'Creative',             difficulty: 'Medium',    xp: 210, time: 60,  description: 'Go outside and collect natural materials — leaves, sticks, stones, dirt. Come home and make a piece of art from them.' },
  { id: 32, title: 'Letter to Future Self',           category: 'Creative',             difficulty: 'Easy',      xp: 110, time: 30,  description: 'Write a detailed letter to yourself 10 years in the future. Seal it. Set a reminder to open it. Don\'t read it early.' },
  { id: 33, title: 'Two-Minute Film',                 category: 'Creative',             difficulty: 'Hard',      xp: 320, time: 120, description: 'Write, shoot, and edit a short film on your phone. Max 2 minutes. It needs a story — a character, a problem, a resolution.' },
  { id: 34, title: 'Recipe from Scratch',             category: 'Creative',             difficulty: 'Medium',    xp: 200, time: 90,  description: 'Invent a recipe entirely from your imagination — no looking anything up. Cook it. Eat it. Name it something ridiculous.' },

  /* ── Food & Drink ─────────────────────────────────────────────────────── */
  { id: 35, title: 'Dish From Afar',                  category: 'Food & Drink',         difficulty: 'Medium',    xp: 200, time: 90,  description: 'Cook a dish from a country you have never cooked from before. Research it properly — use authentic ingredients where possible.' },
  { id: 36, title: 'No Chains',                       category: 'Food & Drink',         difficulty: 'Easy',      xp: 90,  time: 60,  description: 'Eat at a restaurant you\'ve never been to — independent, local, no chains. Order something you wouldn\'t normally pick.' },
  { id: 37, title: 'The Food You\'ve Always Avoided', category: 'Food & Drink',         difficulty: 'Medium',    xp: 180, time: 30,  description: 'Eat a food you\'ve avoided your whole life. Cook it properly. Give it a genuine shot — not just a nibble.' },
  { id: 38, title: 'Fresh Bread',                     category: 'Food & Drink',         difficulty: 'Medium',    xp: 210, time: 180, description: 'Make bread completely from scratch. No bread machine. Knead it by hand, prove it, bake it. Eat it while it\'s warm.' },
  { id: 39, title: 'Flags on the Table',              category: 'Food & Drink',         difficulty: 'Hard',      xp: 350, time: 240, description: 'Host a dinner where every single dish — starter, main, dessert, drink — comes from a different country.' },
  { id: 40, title: 'Market to Meal',                  category: 'Food & Drink',         difficulty: 'Medium',    xp: 220, time: 180, description: 'Go to a farmers market or local food market. Cook dinner using only what you buy there — no supermarket backup.' },
  { id: 41, title: 'Invented Cocktail',               category: 'Food & Drink',         difficulty: 'Easy',      xp: 100, time: 30,  description: 'Invent a cocktail or mocktail using whatever you have at home. Name it. Write down the recipe. Share it with someone.' },
  { id: 42, title: 'Plant-Based Day',                 category: 'Food & Drink',         difficulty: 'Medium',    xp: 190, time: 60,  description: 'Eat entirely vegan or vegetarian for one full day. Plan it properly — this isn\'t just salads. Make it a real effort.' },
  { id: 43, title: 'Childhood Recipe',                category: 'Food & Drink',         difficulty: 'Medium',    xp: 200, time: 90,  description: 'Recreate a dish from your childhood entirely from memory. No recipe, no calling mum. See how close you can get.' },
  { id: 44, title: 'Unknown Cuisine',                 category: 'Food & Drink',         difficulty: 'Medium',    xp: 220, time: 90,  description: 'Cook a meal from a culture you genuinely know nothing about. Research the culture too — not just the food.' },
  { id: 45, title: 'Blind Taste Test',                category: 'Food & Drink',         difficulty: 'Easy',      xp: 80,  time: 30,  description: 'Set up a blind taste test with a friend or family member — different cheeses, hot sauces, chocolates, wines. Score them.' },

  /* ── Fitness ──────────────────────────────────────────────────────────── */
  { id: 46, title: 'New Discipline',                  category: 'Fitness',              difficulty: 'Medium',    xp: 220, time: 60,  description: 'Try a workout style you have never done — yoga, HIIT, boxing, climbing, ballet, kettlebells. Go in with zero expectations.' },
  { id: 47, title: '15K Steps',                       category: 'Fitness',              difficulty: 'Medium',    xp: 190, time: 180, description: 'Hit 15,000 steps in a single day. No treadmill loopholes — it has to be real walking out in the world.' },
  { id: 48, title: 'Cold Shower',                     category: 'Fitness',              difficulty: 'Hard',      xp: 300, time: 10,  description: 'Take a cold shower with no warm water at all. Stay in for a minimum of 2 minutes. No gradual warm-to-cold nonsense.' },
  { id: 49, title: 'Plank PR',                        category: 'Fitness',              difficulty: 'Medium',    xp: 200, time: 15,  description: 'Hold a plank until failure today. Record the time. Next week, beat it by at least 10 seconds. Log both attempts.' },
  { id: 50, title: 'Thirty Minutes Swimming',         category: 'Fitness',              difficulty: 'Hard',      xp: 320, time: 30,  description: 'Swim laps continuously for 30 minutes. No resting at the wall for more than 10 seconds. Keep moving.' },
  { id: 51, title: '5K Your Way',                     category: 'Fitness',              difficulty: 'Medium',    xp: 210, time: 60,  description: 'Complete a 5K — run, walk, or a combination. If you can run it all, push for a personal best. Track your time.' },
  { id: 52, title: 'Class You\'d Never Pick',         category: 'Fitness',              difficulty: 'Medium',    xp: 220, time: 60,  description: 'Sign up for a fitness class you\'ve always dismissed — pole dancing, Zumba, aerial yoga, axe throwing. Show up.' },
  { id: 53, title: '100 Push-Ups',                    category: 'Fitness',              difficulty: 'Hard',      xp: 300, time: 60,  description: 'Do 100 push-ups in a single day. Split them however you need — sets of 10, 5, whatever it takes. All 100 must happen.' },
  { id: 54, title: 'Week of Stretching',              category: 'Fitness',              difficulty: 'Hard', xp: 450, time: 20,  description: 'Stretch for at least 20 minutes every single day for 7 consecutive days. Log your flexibility at the start and end.' },
  { id: 55, title: 'Climb Something',                 category: 'Fitness',              difficulty: 'Hard',      xp: 340, time: 120, description: 'Climb something that challenges you — a hill, a set of stairs, a rock face, a climbing wall. Go until you can\'t go further.' },
  { id: 56, title: 'Sunrise Run',                     category: 'Fitness',              difficulty: 'Medium',    xp: 230, time: 45,  description: 'Set your alarm early enough to run before sunrise. Finish as the sun comes up. Start the day having already done something hard.' },

  /* ── Learning ─────────────────────────────────────────────────────────── */
  { id: 57, title: 'Documentary Dive',                category: 'Learning',             difficulty: 'Easy',      xp: 100, time: 90,  description: 'Watch a full documentary on a topic you know nothing about and have never been curious about. Let it surprise you.' },
  { id: 58, title: '10 Words',                        category: 'Learning',             difficulty: 'Easy',      xp: 90,  time: 30,  description: 'Learn 10 words in a language you\'ve never studied. Not just hello and thank you — useful words. Test yourself at the end.' },
  { id: 59, title: 'First Chapter',                   category: 'Learning',             difficulty: 'Easy',      xp: 80,  time: 30,  description: 'Read the first chapter of a classic novel you\'ve always meant to read. Tonight. No excuses.' },
  { id: 60, title: 'Unfamiliar Podcast',              category: 'Learning',             difficulty: 'Easy',      xp: 90,  time: 60,  description: 'Listen to a full podcast episode on a subject you\'ve never explored. Take one note you\'ll remember afterwards.' },
  { id: 61, title: 'Skill from YouTube',              category: 'Learning',             difficulty: 'Medium',    xp: 200, time: 60,  description: 'Find a YouTube tutorial on a skill you\'ve never tried. Watch it fully, then actually attempt the skill right after.' },
  { id: 62, title: 'One Magic Trick',                 category: 'Learning',             difficulty: 'Medium',    xp: 190, time: 60,  description: 'Learn one card trick or sleight of hand from start to finish. Practice it until you can perform it without hesitation.' },
  { id: 63, title: 'Local History',                   category: 'Learning',             difficulty: 'Easy',      xp: 100, time: 45,  description: 'Research the history of the town or city you live in. Find something genuinely surprising. Share it with someone.' },
  { id: 64, title: 'Five Local Birds',                category: 'Learning',             difficulty: 'Easy',      xp: 90,  time: 60,  description: 'Learn to identify 5 bird species in your area by sight or sound without looking them up mid-walk.' },
  { id: 65, title: 'Course Module',                   category: 'Learning',             difficulty: 'Medium',    xp: 180, time: 60,  description: 'Complete one module of a free online course in a subject you\'ve never studied. Coursera, edX, Khan Academy — pick one.' },
  { id: 66, title: 'Wikipedia Hole',                  category: 'Learning',             difficulty: 'Easy',      xp: 80,  time: 30,  description: 'Start on a random Wikipedia article and follow links with no destination in mind for 30 minutes. See where you end up.' },
  { id: 67, title: 'Explain It Simply',               category: 'Learning',             difficulty: 'Medium',    xp: 200, time: 45,  description: 'Pick a complex topic you know well and explain it to someone who knows nothing about it. If they understand, you\'ve passed.' },

  /* ── Mindfulness & Wellness ───────────────────────────────────────────── */
  { id: 68, title: '10 Minutes Still',                category: 'Mindfulness & Wellness', difficulty: 'Easy',    xp: 90,  time: 10,  description: 'Meditate for 10 minutes with no distractions. Phone on silent, eyes closed, no guided audio. Just you and your thoughts.' },
  { id: 69, title: 'Digital Detox',                   category: 'Mindfulness & Wellness', difficulty: 'Hard', xp: 500, time: 1440, description: 'Go completely phone and screen-free for 24 hours. No exceptions for social media, no quick checks. Tell people in advance.' },
  { id: 70, title: 'Week of Journaling',              category: 'Mindfulness & Wellness', difficulty: 'Hard', xp: 480, time: 15,  description: 'Write in a journal every single day for 7 days. At least one full page each time. No bullet points — full sentences, real thoughts.' },
  { id: 71, title: 'Phone-Free Walk',                 category: 'Mindfulness & Wellness', difficulty: 'Easy',    xp: 80,  time: 30,  description: 'Take a 30-minute walk with your phone left at home. No music, no podcasts, no maps. Just walk and pay attention.' },
  { id: 72, title: 'Body Scan',                       category: 'Mindfulness & Wellness', difficulty: 'Easy',    xp: 90,  time: 20,  description: 'Do a full body scan meditation before you sleep tonight. Work slowly from your feet upward. No rushing it.' },
  { id: 73, title: 'Do Nothing',                      category: 'Mindfulness & Wellness', difficulty: 'Hard',    xp: 300, time: 120, description: 'Spend two hours doing absolutely nothing productive. No self-improvement, no cleaning, no "useful" tasks. Just exist.' },
  { id: 74, title: '10 Genuine Gratitudes',           category: 'Mindfulness & Wellness', difficulty: 'Easy',    xp: 80,  time: 15,  description: 'Write down 10 things you are genuinely grateful for right now. Not generic — specific, detailed, and real.' },
  { id: 75, title: 'Earlier Bedtime',                 category: 'Mindfulness & Wellness', difficulty: 'Medium',  xp: 190, time: 30,  description: 'Go to bed one full hour earlier than usual for 3 consecutive nights. No screens in the last 30 minutes.' },
  { id: 76, title: 'Silence Hour',                    category: 'Mindfulness & Wellness', difficulty: 'Hard',    xp: 280, time: 60,  description: 'Spend one hour in complete silence. No music, no podcast, no TV, no scrolling. Find out what you think about.' },
  { id: 77, title: 'Habit Break',                     category: 'Mindfulness & Wellness', difficulty: 'Hard',    xp: 320, time: 1440, description: 'Identify one habit you want to break and go a full 24 hours without it. No substitutes. Log how you feel at the end.' },

  /* ── Random Acts of Kindness ──────────────────────────────────────────── */
  { id: 78, title: 'Anonymous Gift',                  category: 'Random Acts of Kindness', difficulty: 'Medium', xp: 200, time: 30,  description: 'Leave an anonymous gift for someone who could use a lift. A note, a coffee, a flower, something small and thoughtful. Don\'t tell them it was you.' },
  { id: 79, title: 'Handwritten Letter',              category: 'Random Acts of Kindness', difficulty: 'Easy',   xp: 100, time: 30,  description: 'Write a heartfelt handwritten letter to someone you appreciate but rarely tell. Put it in an envelope. Post it or hand-deliver it.' },
  { id: 80, title: 'Volunteer Hour',                  category: 'Random Acts of Kindness', difficulty: 'Hard',   xp: 350, time: 60,  description: 'Volunteer for at least one hour at a local organisation — food bank, charity shop, community garden. Show up and help.' },
  { id: 81, title: 'Pay It Forward',                  category: 'Random Acts of Kindness', difficulty: 'Easy',   xp: 90,  time: 10,  description: 'Pay for the order of the person behind you in a coffee queue, drive-through, or sandwich shop. Don\'t wait for a thank you.' },
  { id: 82, title: 'Help Unprompted',                 category: 'Random Acts of Kindness', difficulty: 'Easy',   xp: 80,  time: 30,  description: 'Help a stranger today without being asked — directions, carrying something, holding a door properly, whatever presents itself.' },
  { id: 83, title: 'Declutter and Donate',            category: 'Random Acts of Kindness', difficulty: 'Medium', xp: 190, time: 90,  description: 'Fill a bag with clothes, books, or food you no longer need and donate it today. Don\'t save it for later — do it now.' },
  { id: 84, title: 'Check In',                        category: 'Random Acts of Kindness', difficulty: 'Easy',   xp: 90,  time: 20,  description: 'Reach out to someone you haven\'t spoken to in a while and genuinely check in on how they are. Call, don\'t text.' },
  { id: 85, title: 'Public Note',                     category: 'Random Acts of Kindness', difficulty: 'Easy',   xp: 80,  time: 15,  description: 'Leave a kind, uplifting note in a public place — tucked in a book at a library, on a bus seat, under a café napkin. No name.' },
  { id: 86, title: 'Cook for Someone',                category: 'Random Acts of Kindness', difficulty: 'Medium', xp: 210, time: 90,  description: 'Cook a proper meal for someone who could use it — a neighbour, a friend going through a tough time, a family member. Deliver it warm.' },
  { id: 87, title: 'Elderly Neighbour',               category: 'Random Acts of Kindness', difficulty: 'Medium', xp: 200, time: 60,  description: 'Spend at least an hour helping an elderly neighbour with something practical — shopping, a task, a tech problem, gardening.' },

  /* ── Tech & Games ─────────────────────────────────────────────────────── */
  { id: 88, title: 'Finish the Unfinished',           category: 'Tech & Games',         difficulty: 'Hard',      xp: 320, time: 240, description: 'Pick a game you started but never finished. Sit down and complete it — the whole ending. No leaving it at 90% again.' },
  { id: 89, title: 'Dismissed Genre',                 category: 'Tech & Games',         difficulty: 'Medium',    xp: 200, time: 120, description: 'Play a video game genre you have always dismissed — RTS, horror, visual novel, fighting, point-and-click. Give it 2 hours.' },
  { id: 90, title: '24 Hours No Phone',               category: 'Tech & Games',         difficulty: 'Hard', xp: 500, time: 1440, description: 'Go entirely phone-free for 24 hours. No exceptions — not for maps, not for quick checks, not for anything. Tell your contacts first.' },
  { id: 91, title: 'Tabletop Night',                  category: 'Tech & Games',         difficulty: 'Easy',      xp: 90,  time: 120, description: 'Play a board game or card game with real humans in the same room. No phone on the table. Winner buys drinks.' },
  { id: 92, title: 'Build Something Tiny',            category: 'Tech & Games',         difficulty: 'Hard',      xp: 330, time: 120, description: 'Build something with code — a tiny tool, a script, a game, a webpage. It just needs to do one useful or fun thing.' },
  { id: 93, title: 'Delete an App',                   category: 'Tech & Games',         difficulty: 'Medium',    xp: 180, time: 7200, description: 'Delete the app you spend the most time on and don\'t reinstall it for a full week. Notice what you do instead.' },
  { id: 94, title: 'Shortcut Master',                 category: 'Tech & Games',         difficulty: 'Easy',      xp: 80,  time: 20,  description: 'Learn 5 keyboard shortcuts you have never used before. Use all of them at least 3 times each by the end of today.' },
  { id: 95, title: 'Retro Game',                      category: 'Tech & Games',         difficulty: 'Easy',      xp: 100, time: 60,  description: 'Play a video game that came out before you were born. Emulators count. Appreciate what was built with so little.' },
  { id: 96, title: 'Productivity System',             category: 'Tech & Games',         difficulty: 'Medium',    xp: 210, time: 30,  description: 'Set up a productivity system — Notion, physical planner, GTD, anything — and actually use it every day for one week.' },
  { id: 97, title: 'Tech Documentary',                category: 'Tech & Games',         difficulty: 'Easy',      xp: 90,  time: 90,  description: 'Watch a documentary about tech, the internet, or a game — The Social Dilemma, Hi Score Girl, anything. Form your own opinion.' },

  /* ── Nostalgia ────────────────────────────────────────────────────────── */
  { id: 98,  title: 'Old Hobby',                      category: 'Nostalgia',            difficulty: 'Medium',    xp: 200, time: 60,  description: 'Revisit a hobby you loved as a kid and completely abandoned. Do it for at least an hour — no comparing to your current skill.' },
  { id: 99,  title: 'Formative Film',                 category: 'Nostalgia',            difficulty: 'Easy',      xp: 90,  time: 120, description: 'Rewatch a movie that genuinely shaped you — something you loved as a child or teenager. Notice what hits differently now.' },
  { id: 100, title: 'Long Lost Contact',              category: 'Nostalgia',            difficulty: 'Medium',    xp: 210, time: 30,  description: 'Call someone you haven\'t spoken to in over a year. No text — call. Don\'t cancel when it feels awkward to reach out.' },
  { id: 101, title: 'Childhood Meal',                 category: 'Nostalgia',            difficulty: 'Medium',    xp: 190, time: 90,  description: 'Cook the meal that most reminds you of your childhood. The taste that takes you back. Cook it properly.' },
  { id: 102, title: 'That Album',                     category: 'Nostalgia',            difficulty: 'Easy',      xp: 80,  time: 60,  description: 'Listen to the first album or playlist that ever really meant something to you. All the way through. No skipping.' },
  { id: 103, title: 'Place From Your Past',           category: 'Nostalgia',            difficulty: 'Hard',      xp: 300, time: 120, description: 'Visit a place from your past that you haven\'t been back to — old school, old home, park from childhood. Sit with it.' },
  { id: 104, title: 'Recreate the Photo',             category: 'Nostalgia',            difficulty: 'Medium',    xp: 220, time: 60,  description: 'Find an old photo of yourself and recreate it as accurately as possible today. Same pose, same location if possible.' },
  { id: 105, title: 'Childhood Book',                 category: 'Nostalgia',            difficulty: 'Easy',      xp: 90,  time: 60,  description: 'Reread a book you loved as a child. See how much you missed the first time and what hits differently at your age now.' },
  { id: 106, title: '10 Childhood Memories',          category: 'Nostalgia',            difficulty: 'Easy',      xp: 100, time: 30,  description: 'Write down your top 10 childhood memories in vivid detail. Not just what happened — how it felt, what it smelled like.' },
  { id: 107, title: 'Childhood Game',                 category: 'Nostalgia',            difficulty: 'Easy',      xp: 80,  time: 60,  description: 'Play a game you played as a kid — hide and seek, marbles, conkers, tag — with whoever you can rope in. Be fully in it.' },

  /* ── Photography & Observation ────────────────────────────────────────── */
  { id: 108, title: 'Hourly Document',                category: 'Photography & Observation', difficulty: 'Hard',  xp: 300, time: 960, description: 'Take one photograph every hour from the moment you wake up to the moment you sleep. Tell the story of your day.' },
  { id: 109, title: 'Beautiful Mundane',              category: 'Photography & Observation', difficulty: 'Easy',  xp: 90,  time: 30,  description: 'Find genuine beauty in something completely mundane — a drain, a shadow, a piece of packaging. Photograph it. Make it art.' },
  { id: 110, title: 'Time-Lapse',                     category: 'Photography & Observation', difficulty: 'Medium', xp: 200, time: 60, description: 'Set up a time-lapse of something changing — clouds moving, a plant in the sun, a busy street. Watch it back. Share it.' },
  { id: 111, title: 'One Colour Only',                category: 'Photography & Observation', difficulty: 'Medium', xp: 190, time: 60, description: 'Choose a colour. Photograph only things of that colour for an entire day. Collect at least 20 images.' },
  { id: 112, title: 'Three Times at the Same Spot',   category: 'Photography & Observation', difficulty: 'Hard',  xp: 310, time: 720, description: 'Photograph the exact same spot at sunrise, midday, and sunset. See how completely different it looks each time.' },
  { id: 113, title: 'Five Unnoticed Things',          category: 'Photography & Observation', difficulty: 'Easy',  xp: 80,  time: 45,  description: 'Walk a route you know well and find 5 things you have genuinely never noticed before. Photograph each one.' },
  { id: 114, title: 'Photo Essay',                    category: 'Photography & Observation', difficulty: 'Hard',  xp: 320, time: 120, description: 'Create a 10-image photo essay that tells a complete story without any words. Plan it. Shoot it. Sequence it.' },
  { id: 115, title: 'Portrait with a Story',          category: 'Photography & Observation', difficulty: 'Hard',  xp: 340, time: 60,  description: 'Ask a stranger if you can photograph them. Listen to their story first. Let the portrait reflect who they are.' },
  { id: 116, title: 'Black and White Day',            category: 'Photography & Observation', difficulty: 'Medium', xp: 200, time: 60, description: 'Shoot every photo in black and white for a full day. Train your eye to see in light and shadow, not colour.' },
  { id: 117, title: 'Symmetry Hunt',                  category: 'Photography & Observation', difficulty: 'Easy',  xp: 90,  time: 45,  description: 'Find and photograph 5 examples of unexpected symmetry in your everyday surroundings. The stranger the better.' },

  /* ── DIY & Making ─────────────────────────────────────────────────────── */
  { id: 118, title: 'Build From What You Have',       category: 'DIY & Making',         difficulty: 'Medium',    xp: 210, time: 120, description: 'Build something useful using only materials already in your home. No buying anything. Make something that didn\'t exist this morning.' },
  { id: 119, title: 'Craft Kit',                      category: 'DIY & Making',         difficulty: 'Easy',      xp: 90,  time: 90,  description: 'Start a craft kit you\'ve been sitting on. Not tomorrow, not later — open it, follow it, finish it today.' },
  { id: 120, title: 'Fix Don\'t Replace',             category: 'DIY & Making',         difficulty: 'Medium',    xp: 200, time: 60,  description: 'Find something broken in your home and repair it instead of throwing it away or buying a replacement. Look up how to do it.' },
  { id: 121, title: 'Upcycled Clothing',              category: 'DIY & Making',         difficulty: 'Hard',      xp: 310, time: 120, description: 'Take an old piece of clothing you no longer wear and transform it into something new. Cut it, dye it, sew it — make it wearable again.' },
  { id: 122, title: 'Something From Scratch',         category: 'DIY & Making',         difficulty: 'Hard',      xp: 350, time: 240, description: 'Build a piece of furniture or home decor entirely from raw materials. A shelf, a stool, a frame. Look up a method. Make it.' },
  { id: 123, title: 'Handmade Product',               category: 'DIY & Making',         difficulty: 'Medium',    xp: 220, time: 90,  description: 'Make your own candle, soap, bath bomb, or skin product from scratch. Research the ingredients. Use it or give it away.' },
  { id: 124, title: 'Plant Something',                category: 'DIY & Making',         difficulty: 'Hard', xp: 450, time: 30,  description: 'Plant a seed and commit to caring for it for a full month. A herb, a vegetable, anything. Log its growth weekly.' },
  { id: 125, title: 'Handmade Gift',                  category: 'DIY & Making',         difficulty: 'Hard',      xp: 330, time: 180, description: 'Make a gift entirely by hand for someone you care about. It can\'t be bought — every part of it must be made by you.' },
  { id: 126, title: 'New Skill, Real Object',         category: 'DIY & Making',         difficulty: 'Hard', xp: 480, time: 300, description: 'Learn a basic woodworking, leatherworking, or metalworking skill and produce a real physical object using it.' },
  { id: 127, title: 'Restore Something Old',          category: 'DIY & Making',         difficulty: 'Hard',      xp: 340, time: 240, description: 'Find something old, broken, or unloved — furniture, a frame, a pair of shoes — and fully restore it to its former glory.' },
]

export const LEADERBOARD_DATA = []

export const DEFAULT_USER = {
  id: 1,
  name: 'Aldric Vane',
  email: 'aldric.vane@realm.io',
  totalXP: 2840,
  completedCount: 19,
  streak: 5,
  longestStreak: 9,
  rank: 284,
  level: 8,
  levelTitle: 'Quest Wanderer',
  nextLevel: 9,
  nextLevelTitle: 'Quest Seeker',
  xpForNext: 4000,
  categories: ['adventure', 'fitness', 'creative'],
  difficulty: 'Medium',
  frequency: 'Daily',
}

export const HISTORY_SEED = [
  { id: 1,   title: 'Trail Untravelled',          category: 'Adventure & Outdoors', difficulty: 'Medium', xp: 200, date: '2026-06-20', completed: true },
  { id: 46,  title: 'New Discipline',             category: 'Fitness',              difficulty: 'Medium', xp: 220, date: '2026-06-18', completed: true },
  { id: 24,  title: '10-Minute Poem',             category: 'Creative',             difficulty: 'Easy',   xp: 90,  date: '2026-06-15', completed: true },
  { id: 36,  title: 'No Chains',                  category: 'Food & Drink',         difficulty: 'Easy',   xp: 90,  date: '2026-06-12', completed: true },
  { id: 68,  title: '10 Minutes Still',           category: 'Mindfulness & Wellness', difficulty: 'Easy', xp: 90,  date: '2026-06-09', completed: true },
]

export const SAVED_SEED = [
  { ...CHALLENGE_POOL[4]  },
  { ...CHALLENGE_POOL[7]  },
  { ...CHALLENGE_POOL[32] },
  { ...CHALLENGE_POOL[55] },
  { ...CHALLENGE_POOL[88] },
]

export function pickChallenge(categories = [], difficulty = 'Mixed') {
  let pool = CHALLENGE_POOL
  if (categories.length > 0) {
    const catLabels = categories.map(c => CATEGORIES.find(x => x.id === c)?.label).filter(Boolean)
    const filtered  = pool.filter(ch => catLabels.includes(ch.category))
    if (filtered.length > 0) pool = filtered
  }
  if (difficulty !== 'Mixed') {
    const filtered = pool.filter(ch => ch.difficulty === difficulty)
    if (filtered.length > 0) pool = filtered
  }
  return pool[Math.floor(Math.random() * pool.length)]
}

export function getRankTier(rank) {
  if (rank <= 10) return 'Crimson Quest Master'
  if (rank <= 25) return 'Quest Knight'
  return 'Quest Squire'
}

export function getInitials(name = '') {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
}
