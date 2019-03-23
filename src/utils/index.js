export let blockColors = {
  'roof': {
    greenColor: '#546E41',
    grayColor: '#816E5C'
  },
  'sidewalk': {
    greenColor: '#536878',
    grayColor: '#808080'
  },
  'lot': {
    greenColor: '#5BC236',
    grayColor: '#505050'
  },
  'alley': {
    greenColor: '#5BC236',
    grayColor: '#505050'
  },
  'plot of grass': {
    greenColor: 'green',
    grayColor: 'green'
  }
};

export let blockTypes = {
  'r': 'roof',
  's': 'sidewalk',
  'a': 'alley',
  'l': 'lot',
  'g': 'plot of grass'
}

export let greenAlternatives = {
  'roof': 'green roof',
  'sidewalk': 'permeable sidewalk',
  'lot': 'rain garden',
  'alley': 'rain garden'
}

export let greenDescriptions = {
  'roof': "A green roof is a roof that's covered in vegetation",
  'sidewalk': 'A permeable sidewalk is a sidewalk made from special materials that lets the sidewalk absorb stormwater',
  'lot': 'A rain garden is a garden planted with the intention of absorbing stormwater',
  'alley': 'A rain garden is a garden planted with the intention of absorbing stormwater',
}

export let greenBenefits = {
  'roof': ['Absorbs all stormwater that falls on it', 'Improves air quality'],
  'sidewalk': ['Absorbs all stormwater that falls on it'],
  'lot': ['Absorbs all stormwater that falls on it', 'Improves air quality', 'Nice area for community'],
  'alley': ['Absorbs all stormwater that falls on it', 'Improves air quality', 'Nice area for community'],
  'plot of grass': ['Absorbs all stormwater that falls on it']
}

export let greenDisadvantages = {
  'roof': ['Expensive', 'Residents have to move out while green roof is added'],
  'sidewalk': ['Expensive', "Pedestrians can't walk on this sidewalk while it's being replaced"],
  'lot': ["Takes away parking space from the block's residents"],
  'alley': ['Rmoves a path from the street to the lot'],
  'plot of grass': []
}

export let cityBlockSqFt = 100000

let greenUnitCosts = {
  'roof': 25,
  'sidewalk': 12.5,
  'lot': 7.5,
  'alley': 7.5
}

export function cost(sqft, blocktype) {
  return greenUnitCosts[blocktype] * sqft;
}

export function budget(difficulty) {
  if (difficulty === 'easy') {
    return 50000;
  }
  else if (difficulty === 'medium') {
    return 25000;
  }
  else {
    return 15000;
  }
}

export let blockstr = 's s s s s s s s s s s r r a r r a r r s s r r a r r a r r s s a a l l l l r r s s a a l l l l r r s s g g l l l l r r s s g g l l l l r r s s r r a r r a r r s s r r a r r a r r s s s s s s s s s s s'
