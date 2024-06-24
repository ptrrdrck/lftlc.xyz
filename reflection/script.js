/* © 2023 Peter Rodrick <pete@lftlc.xyz> */

document.addEventListener("DOMContentLoaded", function () {
  const reflectionsContainer = document.getElementById("reflectionsContainer");
  const searchBox = document.getElementById("search-box");

  const reflections = {
    1: "no sense<br>or essence<br>open through<br>singing air<br>or clasping breath<br>when found by<br>the veiled eye",
    2: "once upon a moon<br>a long, long time below<br>there i wasn't<br><br>covered from arm to arm<br>in front of myself<br>i cast no shadow<br><br>underneath the waves<br>i could lick the flames<br>of yesterday's tomorrows",
    3: "paths shape<br>and take shape",
    4: "see a story in a face<br>think a hundred steps ahead<br>only to forget<br>the one that came next<br>glide across<br>this sprawl of city streets",
    5: "where is this going?<br><br>in a word?<br>home",
    6: "a quick shrug of the brow<br>forget it ever happened<br><br>mom always told me<br>pick up your feet, and<br>tomorrow's another day<br><br>dad always told me<br>if something's worth doing,<br>it's worth doing right",
    7: "in space,<br>we are the fish",
    8: "i blink and another moment passes<br>i blink and it has all moved on<br>i blink and it's all the same<br>i blink and it's all changed<br>i blink and then i blink again<br><br>i stare and hold the moment<br>i stare and it all moves with me<br>i stare and it's all fusing<br>i stare and it's all crumbling<br>i stare and then i blink again",
    9: "when we fight against<br>what we want the most<br><br>we reach out close<br>but it's in the dark",
    10: "we are masters<br>of our own fate<br>and no one else's<br>by design<br><br>anything in contradiction<br>manufactures<br>destructive forces",
    11: "never wrong<br>about anything<br>but always wrong<br>about everything",
    12: "what i see is what i know<br>and what i know is where i'll be<br>and where i'll be is by your side<br>by your side rise with the tide",
    13: "fight for the idea?<br>or fight for the opportunity to defend the idea?",
    14: "the new world<br>is always brave",
    15: "lower your conscious pressure to expand the mind",
    16: "excommunicated<br>from the church<br>of progress",
    17: "a Brooklyn patch of green<br>ambient salsa music<br>dog barks, dribbled basketballs<br>some fucking marching band goes by<br>wanting quiet<br>in an unquiet place<br>i stretch my neck<br>head tilting back<br>letting the sun soak<br>i think if i get the right angle<br>maybe it will swallow me and take me home<br>but it's only hot skin<br>and none of the day's questions really answered",
    18: "the only way<br>a time-bound<br>connected system<br>can function<br>with purpose<br>is to stay in<br>constant motion",
    19: "we are already<br>infinite",
    20: "the cauldron of chaotic<br>energies and signs<br>is a forging process<br>ahead of new creativity",
    21: "why follow?<br>we can lead together",
    22: "NY is the<br>12 different hands<br>on a subway pole",
    23: "universe<br>or<br>nothing",
    24: "obliviousless",
    25: "settle for half-right<br><br>settle for half, right?",
    26: "conversations with myself<br>(no stranger to)",
    27: "the come down<br>is a let down",
    28: "how far<br>do you have to walk<br>down this road<br>before you see<br>where it leads?<br><br>a step too far",
    29: "point:<br>practice love",
    30: "for us beings of time<br>for better or worse<br>changes are always additive<br><br>i ask, who have you been?<br>who will you be?<br>how close will you get?",
    31: "there are days<br>when i was in her dreams<br>there are days<br>when i was not",
    32: "the difference<br>can be subtle<br>but i'd rather<br>be in my element<br>than in my head",
    33: "writing about<br>what i know<br>trying all along<br>to remember<br>i know nothing",
    34: "look<br>no<br>hands",
    35: "sometimes<br>it bothers me<br>that my music<br>knows how i feel",
    36: "it was the worst<br>of everything<br>but it was the best<br>of me",
    37: "borrowed synths<br>borrowed records<br>and borrowed time<br><br>borrowed friends<br>borrowed bud<br>and borrowed lime",
    38: "halftime of the dreamtime<br>downtime in the daytime<br>lifetime of anytime<br>primetime for sublime<br>sometimes realtime<br>summertime suppertime",
    39: "what's that thing<br>where other people do it<br>then you reflexively<br>do it too?",
    40: "i am you<br>as you are me",
    41: "who you become<br>is who you are<br><br>the complete self<br>stays a mystery",
    42: "offer your white box<br>i'll climb in<br>just to burn it down<br>around me<br>and show you<br>there are no bounds<br>to a soul in search",
    43: "use this<br>think that<br>do this<br>be that",
    44: "no question<br>can ask<br>and no answer<br>can tell<br><br>the purpose<br>chases the energy<br>it supplants",
    45: "hate makes you turn on others<br>fear makes you turn on yourself",
    46: "today is<br>a wonderful day<br>for me<br><br>there will never<br>be another one<br>like it",
    47: "harmony vs. reason<br>balance vs. order<br>universality vs. specificity<br>reality vs. rationality<br>simple in its complexity vs. complex in its simplicity",
    48: "dark matter<br>is the mass<br>of consciousness",
    49: "apps and services<br>should lose points<br>for keeping your<br>attention too long",
    50: "i'm a natural",
    51: "could contextual insight<br>on interneurons emerge<br>from this soup<br>of action potentialed?",
    52: "nothing comes to mind",
    53: "about sweet love...",
    54: "silence's ability<br>to convey more<br>than any words ever could<br>is a natural constant",
    55: "confidence and humility<br>are partners in the same dance",
    56: "put it in the garden<br>see what grows",
    57: "ass.com gets about<br>360,000 visitors per year<br>from address type-ins",
    58: "the New Yorker in me<br>knows",
    59: "survive today to build tomorrow<br>build today to survive tomorrow",
    60: "design a new<br>pasta shape!",
    61: "through memory<br>i am in you",
    62: "a day<br>is not a day",
    63: "i see you<br>in all your glory<br>and i love you<br>that is all",
    64: "allow yourself<br>to look<br>then allow yourself<br>to see",
    65: "Archimedes<br>da Vinci<br>Galileo<br>Maxwell<br>Einstein",
    66: "demand<br>is a lagging indicator<br>of changes<br>truly needed",
    67: "gyroscopic planetarium",
    68: "water elevator",
    69: "collect all footage<br>of people<br>disappearing-on-tape",
    70: "sovereignty<br>exists at the literal<br>heart of a thing",
    71: "capsule for experience swapping",
    72: "a good flow<br>is the result of<br>pairing timing<br>and intention",
    73: "change<br>leeches forward",
    74: "Lagrangian points form<br>the intersections of the<br>invisible mesh of<br>cosmic gravitational energy -<br>naturally adjusting to remain<br>zero-sum points of balance",
    75: "ask kindly<br>for someone's<br>attention",
    76: "people with subscriptions<br>don't enjoy when you<br>mistake them for prescriptions,<br>but people with prescriptions<br>do enjoy when you<br>mistake them for subscriptions",
    77: "kids tell you secrets<br>worth knowing -<br>listen closely",
    78: "that man<br>makes leaving a room<br>an art form",
    79: "being around each other<br>is like looking in a mirror<br>when you didn't mean to",
    80: "yetis are more alpine<br>and above the frost line,<br>whereas bigfoot<br>is more deciduous",
    81: "less denial<br>and more admission<br>is a practice of<br>soul access",
    82: "there is a frontier of thought,<br>a type of no-man's-land<br>between the opposition<br>and the indifferent",
    83: "angry?<br>try crying about it",
    84: "be kind<br>to your mind",
    85: "it takes courage<br>to know you are right<br>even when you are wrong,<br>it takes wisdom<br>to know you are wrong<br>even when you are right",
    86: "harsh vs. gentle<br>unpleasant vs. pleasant<br>malevolent vs. benevolent<br>agony vs. bliss<br>a story vs. the story",
    87: 'in The Matrix,<br>what they call the "real world"<br>is what we call the mind',
    88: "sophistication<br>is more easily seen<br>in retrospect",
    89: "our<br>screens<br>are no<br>false reality<br>their apps<br>and information<br>are<br>digital<br>silvering",
    90: "truth will repeat itself<br>passion will keep listening<br>purpose will answer its call",
    91: "it's ok to be<br>what you never thought<br>you could be<br><br>it's also ok to be<br>what you thought<br>you never could be",
    92: "welcome back<br>from the<br>other side",
    93: "guerrilla leveler",
    94: "what happens when<br>everyone stops<br>apologizing for<br>the inconvenience?",
    95: "willful<br>déjà vu",
    96: "what is IT?<br>i am IT?<br>IT is me?",
    97: "there is no battle,<br>only opposing entanglement",
    98: "hindering our ability<br>to see the traces of<br>our cosmic family<br>is a real threat",
    99: "shared reality<br>is not binary",
    100: "intention affects perception",
    101: "admitting things<br>to yourself<br>about yourself<br>invites harmony",
    102: "light vs. dark<br>invite vs. pull<br>love vs. wickedness<br>given vs. taken<br>free vs. coerced",
    103: "our experience<br>is an ever-unbalanced equation<br>of effort and rest",
    104: "beware<br>the perpetual<br>avatar",
    105: "play with the rules<br><br>they are never real",
    106: "seize the opportunities<br>to raise others up,<br>wherever they may be",
    107: "slow down<br>to sync up",
    108: "to understand time dilation,<br>wait a minute",
    109: "dogs reveal<br>the energy of a place",
    110: "ayahuasca gave her<br>diamond skin",
    111: "i came to see<br>what is to be unseen",
    112: "i've found my god<br>and it's exactly<br>what i thought it'd be",
    113: "base reality<br>the ocean of uncertainty<br>the inertial frame of reference<br>the inoperable space<br>of our unbuilt environment",
    114: "the piggishly pious<br>are a pestiferous people<br>with a pestilential poison",
    115: "be uselessly useful<br>and usefully useless",
    116: 'when the time comes,<br>there is a good chance<br>"fuck" will be the last<br>word ever spoken',
    117: "the united heart and mind<br>beckon one another<br>in the physical",
    118: "using a mirror,<br>attempt to look inside the pupil<br>of the reflection of yourself<br>looking into your own pupil -<br>be soft in the eye<br>and allow it to adjust to the task",
    119: "i will look<br>for the both of us",
    120: "i can feel the echo<br>of you<br>in me",
    121: "when i listen long enough,<br>she tells me all her secrets",
    122: "miracles are those quantum moments<br>of supreme energetic confluence",
    123: "time passes through us<br>we do not pass through time<br><br>life force is the stationary existence,<br>our incumbent infinity",
    124: "i am caught in the wind of the arc<br>tethered for now<br>to a mast beneath light",
    125: "was i fair?<br>was i beautiful?",
    126: "live at odds, love at evens",
    127: "peace is the gaseous state of kindness",
    128: "awareness through participatory<br>subversion has style,<br>and style has staying power",
    129: "culture is led by dreams,<br>and paced by fear",
    130: "expect evolution<br>and evolution will expect you",
    131: "the internet is a window,<br>the digital reckoning of our primal forces will continue",
    132: "hug all the way through to your fingertips",
    133: "our anthropoetic wiring<br>slowly envelops us like vines",
    134: "natural states permit natural fates",
    135: "sloppy tastes good",
    136: "fluidity is the framework",
    137: "just close your eyes<br>where the sun rises<br>while it sets",
    138: "a brief something<br>amidst eternal nothing",
    139: "that brief visual anomaly<br>that familiar pattern<br>that rush of sound to be decoded<br>that reminder on your tongue<br>and the scent pulled in<br>helped you feel<br>a type of place<br>in a type of way",
    140: "the simple evolutionary twist<br>of our inward optic projection<br>instigates the buffer<br>by which we create",
    141: "our ability to access alternate states of consciousness<br>allows us to accord with “the way things are” from perspectives<br>alien to the dominant visual reproduction of light our mind is accustomed to,<br>but at the same time akin to its source",
    142: "light contains the totality of available information<br>and our minds synthesize its presence according to our current state of consciousness",
    143: "error: smooth path ahead,<br>this loop has already been run",
    144: "here may we seek clarity of choice before definition of result<br>let us consider the refraction of our layers of abstraction<br>and discover anew - while possibility persists the heart consists",
    145: "kiss me more slowly than the mountains grow and the moon recedes",
    146: "in the middle<br>there are equal parts<br>sameness and uniqueness;<br>we all begin life here",
    147: "like finding a swing in the woods",
    148: "the error probability in quantum calculations is randomness",
    149: "the angels are in the details",
    150: "i'll think<br>i wish i could have laughed<br>even more",
  };

  function displayReflections(reflectionObject) {
    reflectionsContainer.innerHTML = "";
    for (const key in reflectionObject) {
      const reflectionDiv = document.createElement("div");
      reflectionDiv.className = "reflection words gradient-border";
      const p = document.createElement("p");
      p.className = "fade-in";
      p.innerHTML = reflectionObject[key];
      reflectionDiv.appendChild(p);
      reflectionsContainer.appendChild(reflectionDiv);
    }
  }

  displayReflections(reflections);

  function filterReflections(searchText) {
    const filteredReflections = {};
    for (const key in reflections) {
      if (reflections[key].toLowerCase().includes(searchText.toLowerCase())) {
        filteredReflections[key] = reflections[key];
      }
    }
    return filteredReflections;
  }

  searchBox.addEventListener("input", function () {
    const searchText = searchBox.value.trim();
    const filteredReflections = filterReflections(searchText);
    displayReflections(filteredReflections);
  });
});
