/**
 * commands.js — Indian Army command structure data.
 *
 * Sources: publicly available Indian Army order of battle.
 * Unit numbers and locations are representative of the known
 * structure; specific brigade/battalion data is deliberately
 * omitted as it is operationally sensitive.
 */

export const ARMY_HQ = {
  name: 'Indian Army',
  title: 'Army Headquarters',
  location: 'New Delhi',
  chiefTitle: 'Chief of Army Staff (COAS)',
  rankLabel: 'General',
  stars: 4,
  specialUnits: [
    { name: '50 Para Assault Brigade', shortName: '50 Para Bde', location: 'Agra', type: 'para' },
    { name: 'Army Strategic Forces Command', shortName: 'ASFC', location: 'New Delhi', type: 'strategic' },
  ],
};

/**
 * Hierarchy metadata — used to build the chain-of-command flow
 * diagram on the overview page (replicates Image 1 style).
 */
export const HIERARCHY_LEVELS = [
  {
    id: 'army',
    label: 'Indian Army',
    unitLabel: 'Army',
    count: '1',
    commanderRank: 'General (★★★★)',
    description: 'Supreme military authority under the COAS',
  },
  {
    id: 'command',
    label: '7 Commands',
    unitLabel: 'Command',
    count: '7',
    commanderRank: 'Lieutenant General (★★★)',
    description: 'Field commands covering each geographic theatre',
    perParent: '—',
  },
  {
    id: 'corps',
    label: 'Corps',
    unitLabel: 'Corps',
    count: '2–3 per Command',
    commanderRank: 'Lieutenant General (★★)',
    description: 'Operational grouping of 2–3 divisions',
    perParent: '2–3',
    showCount: 3,
  },
  {
    id: 'division',
    label: 'Division',
    unitLabel: 'Division',
    count: '2–3 per Corps',
    commanderRank: 'Major General (★)',
    description: '10,000–20,000 troops; primary tactical formation',
    perParent: '2–3',
    showCount: 3,
  },
  {
    id: 'brigade',
    label: 'Brigade',
    unitLabel: 'Brigade',
    count: '3 per Division',
    commanderRank: 'Brigadier',
    description: '3,000–5,000 troops; combined arms grouping',
    perParent: '3',
    showCount: 3,
  },
  {
    id: 'battalion',
    label: 'Battalion',
    unitLabel: 'Battalion',
    count: '3–4 per Brigade',
    commanderRank: 'Colonel / Lt. Colonel',
    description: '700–900 troops; basic manoeuvre unit',
    perParent: '3–4',
    showCount: 3,
  },
  {
    id: 'company',
    label: 'Company',
    unitLabel: 'Company',
    count: '4 per Battalion',
    commanderRank: 'Major / Captain',
    description: '100–150 troops',
    perParent: '4',
    showCount: 4,
  },
];

/** Division type metadata for styling */
export const DIVISION_TYPES = {
  infantry:  { label: 'Infantry',  color: '#4C5D34' },
  mountain:  { label: 'Mountain',  color: '#2B5F5F' },
  armoured:  { label: 'Armoured',  color: '#7A4F1E' },
  artillery: { label: 'Artillery', color: '#5C3A8A' },
  strategic: { label: 'Strategic', color: '#1A3A6B' },
  training:  { label: 'Training',  color: '#2E5A4A' },
  rapid:     { label: 'RAPID',     color: '#6B3A1A' },
};

/** The 7 Field Commands */
export const COMMANDS = [
  {
    id: 'northern',
    name: 'Northern Command',
    abbreviation: 'NC',
    location: 'Udhampur',
    state: 'Jammu & Kashmir',
    stars: 3,
    accentColor: '#1A4B7A',
    shieldColor: '#1E3A5F',
    tagline: 'Protecting the Northern Frontier',
    established: 1947,
    areaOfOps: 'J&K, Ladakh, Himachal Pradesh',
    corps: [
      {
        id: 'nc-14', number: 14, romanNumber: 'XIV',
        name: '14 Corps', nickname: 'Fire & Fury Corps',
        location: 'Leh', type: 'mountain', stars: 2,
        motto: 'Ready, Aye Ready',
        divisions: [
          { number: 3,  shortName: '3 ID',  name: '3 Infantry Division',   location: 'Leh',        type: 'infantry' },
          { number: 8,  shortName: '8 MD',  name: '8 Mountain Division',   location: 'Dalhousie',  type: 'mountain' },
        ],
      },
      {
        id: 'nc-15', number: 15, romanNumber: 'XV',
        name: '15 Corps', nickname: 'Chinar Corps',
        location: 'Srinagar', type: 'mountain', stars: 2,
        motto: 'Strike Hard',
        divisions: [
          { number: 19, shortName: '19 ID', name: '19 Infantry Division',  location: 'Baramulla',  type: 'infantry' },
          { number: 28, shortName: '28 ID', name: '28 Infantry Division',  location: 'Udhampur',   type: 'infantry' },
        ],
      },
      {
        id: 'nc-16', number: 16, romanNumber: 'XVI',
        name: '16 Corps', nickname: 'White Knight Corps',
        location: 'Nagrota', type: 'mountain', stars: 2,
        motto: 'Invincible',
        divisions: [
          { number: 10, shortName: '10 ID', name: '10 Infantry Division',  location: 'Akhnoor',    type: 'infantry' },
          { number: 25, shortName: '25 ID', name: '25 Infantry Division',  location: 'Ranikhet',   type: 'infantry' },
          { number: 26, shortName: '26 ID', name: '26 Infantry Division',  location: 'Jammu',      type: 'infantry' },
        ],
      },
    ],
  },

  {
    id: 'western',
    name: 'Western Command',
    abbreviation: 'WC',
    location: 'Chandigarh',
    state: 'Punjab',
    stars: 3,
    accentColor: '#276749',
    shieldColor: '#1F4F37',
    tagline: 'Sword Arm of the Army',
    established: 1947,
    areaOfOps: 'Punjab, Haryana, Himachal Pradesh, J&K (partial)',
    corps: [
      {
        id: 'wc-1', number: 1, romanNumber: 'I',
        name: '1 Corps', nickname: 'Sudarshan Chakra Corps',
        location: 'Mathura', type: 'strike', stars: 2,
        motto: 'Strike Swiftly',
        divisions: [
          { number: 2,  shortName: '2 AD',  name: '2 Armoured Division',   location: 'Ambala',     type: 'armoured' },
          { number: 6,  shortName: '6 AD',  name: '6 Armoured Division',   location: 'Jhansi',     type: 'armoured' },
          { number: 14, shortName: '14 ID', name: '14 Infantry Division',  location: 'Ferozpur',   type: 'infantry' },
        ],
      },
      {
        id: 'wc-2', number: 2, romanNumber: 'II',
        name: '2 Corps', nickname: 'Kharga Corps',
        location: 'Ambala', type: 'holding', stars: 2,
        motto: 'Ever Ready',
        divisions: [
          { number: 7,  shortName: '7 ID',  name: '7 Infantry Division',   location: 'Ferozpur',   type: 'infantry' },
          { number: 22, shortName: '22 ID', name: '22 Infantry Division',  location: 'Meerut',     type: 'infantry' },
          { number: 29, shortName: '29 ID', name: '29 Infantry Division',  location: 'Pathankot',  type: 'infantry' },
        ],
      },
      {
        id: 'wc-11', number: 11, romanNumber: 'XI',
        name: '11 Corps', nickname: 'Pratap Corps',
        location: 'Jalandhar', type: 'holding', stars: 2,
        motto: 'Vigilant and Victorious',
        divisions: [
          { number: 9,  shortName: '9 ID',  name: '9 Infantry Division',   location: 'Yol',        type: 'infantry' },
          { number: 15, shortName: '15 ID', name: '15 Infantry Division',  location: 'Amritsar',   type: 'infantry' },
          { number: 23, shortName: '23 ID', name: '23 Infantry Division',  location: 'Bathinda',   type: 'infantry' },
        ],
      },
    ],
  },

  {
    id: 'south-western',
    name: 'South Western Command',
    abbreviation: 'SWC',
    location: 'Jaipur',
    state: 'Rajasthan',
    stars: 3,
    accentColor: '#B7791F',
    shieldColor: '#8B5E16',
    tagline: 'Shield of the Desert',
    established: 2005,
    areaOfOps: 'Rajasthan, Gujarat',
    corps: [
      {
        id: 'swc-10', number: 10, romanNumber: 'X',
        name: '10 Corps', nickname: 'Chetak Corps',
        location: 'Bathinda', type: 'strike', stars: 2,
        motto: 'Fight to Win',
        divisions: [
          { number: 24, shortName: '24 ID', name: '24 Infantry Division',  location: 'Bikaner',    type: 'infantry' },
          { number: 33, shortName: '33 AD', name: '33 Armoured Division',  location: 'Patiala',    type: 'armoured' },
          { number: 42, shortName: '42 AD', name: '42 Armoured Division',  location: 'Jaipur',     type: 'armoured' },
        ],
      },
      {
        id: 'swc-12', number: 12, romanNumber: 'XII',
        name: '12 Corps', nickname: 'Vijay Corps',
        location: 'Jodhpur', type: 'holding', stars: 2,
        motto: 'Victory or Death',
        divisions: [
          { number: 11, shortName: '11 ID', name: '11 Infantry Division',  location: 'Ahmedabad',  type: 'infantry' },
          { number: 12, shortName: '12 ID', name: '12 Infantry Division',  location: 'Jodhpur',    type: 'infantry' },
        ],
      },
    ],
  },

  {
    id: 'southern',
    name: 'Southern Command',
    abbreviation: 'SC',
    location: 'Pune',
    state: 'Maharashtra',
    stars: 3,
    accentColor: '#744210',
    shieldColor: '#5A3410',
    tagline: 'Guardian of the Peninsula',
    established: 1895,
    areaOfOps: 'Maharashtra, Andhra Pradesh, Karnataka, Tamil Nadu, Goa',
    corps: [
      {
        id: 'sc-21', number: 21, romanNumber: 'XXI',
        name: '21 Corps', nickname: 'Red Eagle Corps',
        location: 'Bhopal', type: 'strike', stars: 2,
        motto: 'Strike & Win',
        divisions: [
          { number: 31, shortName: '31 AD', name: '31 Armoured Division',  location: 'Jhansi',     type: 'armoured' },
          { number: 36, shortName: '36 ID', name: '36 Infantry Division',  location: 'Secunderabad', type: 'infantry' },
          { number: 54, shortName: '54 ID', name: '54 Infantry Division',  location: 'Hyderabad',  type: 'infantry' },
        ],
      },
    ],
  },

  {
    id: 'eastern',
    name: 'Eastern Command',
    abbreviation: 'EC',
    location: 'Kolkata',
    state: 'West Bengal',
    stars: 3,
    accentColor: '#2F855A',
    shieldColor: '#1F6044',
    tagline: 'Sentinel of the East',
    established: 1942,
    areaOfOps: 'West Bengal, Sikkim, Arunachal Pradesh, Meghalaya, Assam, Nagaland, Manipur, Tripura, Mizoram',
    corps: [
      {
        id: 'ec-3', number: 3, romanNumber: 'III',
        name: '3 Corps', nickname: 'Spear Corps',
        location: 'Dimapur', type: 'mountain', stars: 2,
        motto: 'Stab and Strike',
        divisions: [
          { number: 2,  shortName: '2 ID',  name: '2 Infantry Division',   location: 'Dimapur',    type: 'infantry' },
          { number: 4,  shortName: '4 ID',  name: '4 Infantry Division',   location: 'Tezpur',     type: 'infantry' },
          { number: 57, shortName: '57 MD', name: '57 Mountain Division',  location: 'Leimakhong', type: 'mountain' },
        ],
      },
      {
        id: 'ec-4', number: 4, romanNumber: 'IV',
        name: '4 Corps', nickname: 'Trishul Corps',
        location: 'Tezpur', type: 'mountain', stars: 2,
        motto: 'Destroy Evil',
        divisions: [
          { number: 5,  shortName: '5 MD',  name: '5 Mountain Division',   location: 'Bomdila',    type: 'mountain' },
          { number: 56, shortName: '56 MD', name: '56 Mountain Division',  location: 'Missamari',  type: 'mountain' },
        ],
      },
      {
        id: 'ec-33', number: 33, romanNumber: 'XXXIII',
        name: '33 Corps', nickname: 'Vajra Corps',
        location: 'Sukna', type: 'mountain', stars: 2,
        motto: 'Thunderbolt',
        divisions: [
          { number: 17, shortName: '17 MD', name: '17 Mountain Division',  location: 'Gangtok',    type: 'mountain' },
          { number: 20, shortName: '20 MD', name: '20 Mountain Division',  location: 'Binnaguri',  type: 'mountain' },
          { number: 27, shortName: '27 MD', name: '27 Mountain Division',  location: 'Kalimpong',  type: 'mountain' },
        ],
      },
    ],
  },

  {
    id: 'central',
    name: 'Central Command',
    abbreviation: 'CC',
    location: 'Lucknow',
    state: 'Uttar Pradesh',
    stars: 3,
    accentColor: '#4C5D34',
    shieldColor: '#3A4828',
    tagline: 'Heart of the Nation\'s Defence',
    established: 1920,
    areaOfOps: 'Uttar Pradesh, Madhya Pradesh, Bihar, Jharkhand, Odisha, Chhattisgarh',
    corps: [
      {
        id: 'cc-reserve', number: null, romanNumber: null,
        name: 'Strategic Reserve', nickname: 'Central Reserve',
        location: 'Lucknow', type: 'strategic', stars: null,
        motto: '',
        divisions: [
          { number: 6,  shortName: '6 MD',  name: '6 Mountain Division',   location: 'Bareilly',   type: 'mountain' },
          { number: 21, shortName: '21 ID', name: '21 Infantry Division',  location: 'Bhopal',     type: 'infantry' },
          { number: 40, shortName: '40 AD', name: '40 Artillery Division', location: 'Lucknow',    type: 'artillery' },
        ],
      },
    ],
  },

  {
    id: 'training',
    name: 'Training Command',
    abbreviation: 'TC',
    location: 'Shimla',
    state: 'Himachal Pradesh',
    stars: 3,
    accentColor: '#553C9A',
    shieldColor: '#3D2B7A',
    tagline: 'Forging Soldiers of Tomorrow',
    established: 1991,
    areaOfOps: 'All India — Training establishments nationwide',
    corps: [
      {
        id: 'tc-artrac', number: null, romanNumber: null,
        name: 'ARTRAC', nickname: 'Army Training Command',
        location: 'Shimla', type: 'training', stars: null,
        motto: '',
        divisions: [
          { number: 1, shortName: '1 Arty', name: '1 Artillery Division', location: 'Nasik Road', type: 'artillery' },
        ],
      },
    ],
  },
];
