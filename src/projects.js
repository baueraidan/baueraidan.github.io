const projects = [
  {
    title: 'Hexel',
    platforms: ['Web', 'iOS', 'Android'],
    subtitle: 'A puzzle game about connecting and combining colorful dots',
    buttons: [
      { label: 'Web', url: 'http://hexel.co/' },
      { label: 'iOS', url: 'https://apps.apple.com/st/app/hexel-a-colorful-puzzler/id1042727768' },
    ],
    videoSrc: 'media/hexel.mp4',
    text: [
      'Hexel is a puzzle game I made in the summer of 2015. Your goal is to combine dots to trade up through the rainbow and ultimately reach the rainbow dot. You can swipe to combine and move the dots around inside of the hexagon; the game ends when you run out of room inside of the hexagon and no more dots can be combined.',
      'Although the objective is simple and the mechanics are easy to learn, your moves require progressively more planning and forethought as the board begins to fill up.'
    ],
    technologies: ['JavaScript', 'React', 'Cordova']
  },
  {
    title: 'FaceFuse',
    platforms: ['iOS', 'Android'],
    subtitle: 'AI-powered face blending app',
    videoSrc: 'media/facefuse.mp4',
    imgSrc: 'media/facefuse.png',
    text: [
      'FaceFuse is a machine learning project I worked on in the summer of 2020. The app allows you to upload two photos of faces, and it generates a realistic mashup of the two faces by leveraging Nvidia’s StyleGAN2 library. The app also lets you modify the resulting face by playing with its age, gender, emotion, hair, and makeup.'
    ],
    technologies: ['JavaScript', 'React Native', 'Python', 'Flask', 'StyleGAN2']
  },
  {
    title: 'Rentingway',
    platforms: ['Web', 'iOS', 'Android'],
    subtitle: 'A rental management platform',
    buttons: [
      { label: 'Web', url: 'https://rentingway.com/' },
      { label: 'iOS', url: 'https://apps.apple.com/us/app/rentingway/id1492505360' },
      { label: 'Android', url: 'https://play.google.com/store/apps/details?id=com.rentingway.android&hl=en_US&gl=US' },

    ],
    imgSrc: 'media/rentingway.png',
    text: [
      'Rentingway is a small Boston-based startup I worked at for two years as the Lead Frontend Developer. In that time I created their website and mobile app, including a property management dashboard for landlords, tenant-to-landlord instant messaging, a social media platform, account registration, and a landing page with marketing material.'
    ],
    technologies: ['JavaScript', 'React', 'Cordova', 'Dwolla']
  },
  {
    title: 'Word Surge',
    platforms: ['Web', 'iOS', 'Android'],
    subtitle: 'A game about forming words and clearing levels',
    buttons: [
      { label: 'Web', url: 'https://www.word-surge.com/' },
      { label: 'iOS', url: 'https://apps.apple.com/vn/app/word-surge/id1465428508' },
      { label: 'Android', url: 'https://play.google.com/store/apps/details?id=com.aidan.WordSurgeCompliant&hl=en_US&gl=US' }
    ],
    videoSrc: 'media/word-surge.mp4',
    imgSrc: 'media/word-surge.png',
    text: [
      'Word Surge is a casual word game I published in early 2020. Players swipe to form words and advance through levels of increasing difficulty. Each level has a distinct shape, which hints at the theme of the words hidden in the puzzle.',
      'As you clear words, the remaining letters tumble down and reveal other words needed to clear the puzzle.',
      'I licensed Word Surge to Coolmath, LLC in February of 2020. Since then, the game has had over 300,000 players from 164 countries.'
    ],
    technologies: ['JavaScript', 'React', 'Cordova']
  },
  {
    //title: 'Untitled',
    platforms: ['iOS', 'Android'],
    subtitle: 'A cute casual puzzle game',
    videoSrc: 'media/untitled.mp4',
    imgSrc: 'A cute puzzle game',
    text: [
      'This is a puzzle game I worked on a couple years ago to challenge myself more with art and design.',
      'Players can slide the cute tiles around the board to pop groups of 3 or more adjacent tiles. Certain tiles have special abilities, like clearing an entire row or column, or eliminating all tiles of a certain color. Levels become increasingly more complicated and difficult to clear.'
    ],
    technologies: ['JavaScript', 'React', 'Cordova']
  },
  {
    title: 'Slipslot',
    platforms: ['iOS', 'Android'],
    subtitle: 'A brain-teasing puzzle game',
    videoSrc: 'media/slipslot.mp4',
    imgSrc: 'A brain-teasing puzzle game',
    text: [
      'Slipslot is a challenging puzzle game I worked on a couple years ago. Your goal is to slide each piece into a corresponding hole of the same color and shape.',
      'Levels get progressively more challenging and rewarding as they require more forethought and creativity to solve.'
    ],
    technologies: ['JavaScript', 'React', 'Cordova']
  },
  {
    title: 'Unjumble',
    platforms: ['iOS', 'Android'],
    subtitle: 'A puzzle game about tying up loose ends',
    buttons: [
      { label: 'iOS', url: 'https://apps.apple.com/us/app/unjumble-puzzle/id1169456998' },
    ],
    videoSrc: 'media/unjumble.mp4',
    imgSrc: 'media/unjumble.png',
    text: [
      'Unjumble is a therapeutic puzzle game I made in 2016.',
      'Tap tiles to rotate them into place, forming closed loops and tying up each loose end with another of the same color. Unjumble has about 30 levels of increasing complexity.'
    ],
    technologies: ['JavaScript', 'HTML/CSS']
  },
  {
    title: 'Traveling Salesman',
    platforms: ['Web'],
    subtitle: 'An animated and interactive solution to the classic problem',
    buttons: [
      { label: 'Web', url: '/traveling-salesman' },
    ],
    imgSrc: 'media/traveling-salesman.png',
    text: [
      'The Traveling Salesman Problem poses a natural question: "What\'s the quickest way to get from point A to point B, and 1,000 points in-between?" It seems like a computer would be good at solving a problem like this—just check every possible route and see which is the shortest.',
      'In actuality, once you have more than a couple of points, there are more possible routes than there are atoms in the observable universe. That\'s when you have to rely on a heuristic (approximate) solution, like the one I came up with here. My solution uses a combination of the greedy algorithm and the 2-opt swap algorithm.'
    ],
    technologies: ['JavaScript', 'HTML/CSS']
  },
  {
    title: 'Mandelbrot Set',
    platforms: ['Web'],
    subtitle: 'An interactive visualization of the famous fractal',
    buttons: [
      { label: 'Web', url: '/mandelbrot' },
    ],
    imgSrc: 'media/mandelbrot.png',
    text: [
      'The Mandelbrot Set is a beautiful fractal that exists in the complex number plane. This is an interactive visualization I coded for it, which allows you to click and drag to zoom in and explore its famous patterns. My visualization is different than the ones I’ve seen because it computes and draws the fractal in real-time in the browser.'
    ],
    technologies: ['JavaScript', 'HTML/CSS']
  },
  {
    title: 'Electron Orbitals',
    platforms: ['Web'],
    subtitle: 'An interactive visualization of electron orbitals',
    buttons: [
      { label: 'Web', url: '/electron-orbitals' },
    ],
    imgSrc: 'media/electron-orbitals.png',
    text: [
      'This visualization was my foray into real-time 3D modeling. It uses the Schrödinger equation to create 3-dimensional models for various electron orbitals. You can use the controls at the top of the page to view different orbitals, and to change the appearance and detail of the model. Scroll or pinch to zoom, and drag to pan around.'
    ],
    technologies: ['JavaScript', 'Three.js', 'HTML/CSS']
  },
  {
    title: 'Ideal Gas Law',
    platforms: ['Web'],
    subtitle: 'An interactive visualization of the ideal gas law',
    buttons: [
      { label: 'Web', url: '/ideal-gas-law' },
    ],
    videoSrc: 'media/ideal-gas-law.mp4',
    imgSrc: 'media/ideal-gas-law.png',
    text: [
      'The Ideal Gas Law models the pressure of a gas in a container, given its volume, temperature, and amount of particles. You can play around with these values using the sliders at the top of the page, and see how they affect the animated visualization of the particles.'
    ],
    technologies: ['JavaScript', 'Three.js', 'HTML/CSS']
  },
]

export default projects