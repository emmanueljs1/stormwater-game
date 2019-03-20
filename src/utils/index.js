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
  'grass': {
    greenColor: 'green',
    grayColor: 'green'
  }
};

export let blockTypes = {
  'r': 'roof',
  's': 'sidewalk',
  'l': 'lot',
  'g': 'grass'
}

export let greenAlternatives = {
  'roof': 'green roof',
  'sidewalk': 'permeable sidewalk',
  'lot': 'rain garden',
  'grass': 'stormwater basin'
}

// TODO: add lot and grass mappings
export let greenDescriptions = {
  'roof': "A green roof is a roof that's covered in vegetation",
  'sidewalk': 'A permeable sidewalk is a sidewalk made from special materials that lets the sidewalk absorb stormwater',
}

// TODO: add lot and grass mappings
export let greenBenefits = {
  'roof': 'Absorbs all stormwater that falls on it',
  'sidewalk': 'Absorbs all stormwater that falls on it'
}

// TODO: add lot and grass mappings
export let greenDisadvantages = {
  'roof': ['Expensive', 'Residents have to move out while green roof is added'],
  'sidewalk': ['Expensive', "Pedestrians can't walk on this sidewalk while it's being replaced"]
}

export let cityBlockSqFt = 100000

// TODO: add lot and grass mappings
let greenUnitCosts = {
  'roof': 25,
  'sidewalk': 12.5
}

export function cost(sqft, blocktype) {
  return greenUnitCosts[blocktype] * sqft;
}

export let blockstr = 's s s s s s s s s s s r r l r r l r r s s r r l r r l r r s s l l l l l l r r s s l l l l l l r r s s g g l l l l r r s s g g l l l l r r s s r r l r r l r r s s r r l r r l r r s s s s s s s s s s s'
