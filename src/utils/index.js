export let blockColors = {
  'roof': {
    greenColor: '#546E41',
    grayColor: '#816E5C'
  },
  'street': {
    greenColor: '#536878',
    grayColor: '#6f6f6f'
  },
  'lot': {
    greenColor: 'green',
    grayColor: '#354048'
  },
  'alley': {
    greenColor: 'green',
    grayColor: '#354048'
  },
  'plot of grass': {
    greenColor: 'green',
    grayColor: 'green'
  }
};

export let blockTypes = {
  'r': 'roof',
  's': 'street',
  'a': 'alley',
  'l': 'lot',
  'g': 'plot of grass'
}

export let greenAlternatives = {
  'roof': 'green roof',
  'street': 'permeable street',
  'lot': 'rain garden',
  'alley': 'rain garden'
}

export let greenDescriptions = {
  'roof': "A green roof is a roof that's covered in vegetation",
  'street': 'A permeable street is a street made from special materials that lets the street absorb stormwater',
  'lot': 'A rain garden is a garden planted with the intention of absorbing stormwater',
  'alley': 'A rain garden is a garden planted with the intention of absorbing stormwater',
}

export let greenBenefits = {
  'roof': ['Absorbs all stormwater that falls on it', 'Improves air quality'],
  'street': ['Absorbs all stormwater that falls on it'],
  'lot': ['Absorbs all stormwater that falls on it', 'Improves air quality', 'Nice area for community'],
  'alley': ['Absorbs all stormwater that falls on it', 'Improves air quality', 'Nice area for community'],
  'plot of grass': ['Absorbs all stormwater that falls on it']
}

export let greenDisadvantages = {
  'roof': ['Expensive', 'Residents have to move out while green roof is added'],
  'street': ['Expensive', "Pedestrians can't walk on this street while it's being replaced"],
  'lot': ["Takes away parking space from the block's residents"],
  'alley': ['Removes a path from the street to the lot'],
  'plot of grass': []
}

export let blockImages = {
  'street': {
    'NW': 'nw_street.png',
    'NE': 'ne_street.png',
    'SW': 'sw_street.png',
    'SE': 'se_street.png',
    'H': 'horizontal_street.png',
    'VE': 'vertical_E_street.png',
    'VW': 'vertical_W_street.png'
  },
  'roof': 'roof.png',
  'plot of grass': 'grass.png',
  'lot': 'lot.png',
  'alley': 'lot.png'
}

export let cityBlockSqFt = 100000

let greenUnitCosts = {
  'roof': 25,
  'street': 12.5,
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

export let blockstr = 's s s s s s s s s s s r r g r r g r r s s r r g r r g r r s s a a l l l l a a s s r r l l l l r r s s r r l l l l r r s s a a l l l l a a s s r r g r r g r r s s r r g r r g r r s s s s s s s s s s s'
