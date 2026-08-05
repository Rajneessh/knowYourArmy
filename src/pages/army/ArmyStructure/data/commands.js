/**
 * commands.js — Indian Army command structure data.
 * Updated based on official Indian Army structure diagram.
 */

import armyHQEmblem from '../../../../assets/emblems/ArmyHQEmblem.png';
import armyNorthernEmblem from '../../../../assets/emblems/ArmyNorthernCommandEmblem.png';
import armyWesternEmblem from '../../../../assets/emblems/ArmyWesternCommandEmblem.png';
import armySouthWesternEmblem from '../../../../assets/emblems/ArmySouthWesternCommandEmblem.png';
import armySouthernEmblem from '../../../../assets/emblems/ArmySouthernCommandEmblem.png';
import armyEasternEmblem from '../../../../assets/emblems/ArmyEasternCommandEmblem.png';
import armyCentralEmblem from '../../../../assets/emblems/ArmyCentralCommandEmblem.png';
import armyTrainingEmblem from '../../../../assets/emblems/ArmyTrainingCommandEmblem.png';

export const ARMY_HQ = {
  name: 'Indian Army Headquarters',
  title: 'Army Headquarters',
  location: 'New Delhi',
  chiefTitle: 'Chief of Army Staff (COAS)',
  rankLabel: 'General',
  stars: 4,
  emblem: armyHQEmblem,
  specialUnits: [
    { name: '50th Parachute Brigade', shortName: '50th Para Bde', location: 'Agra', type: 'para', stars: 1 },
  ],
};

/** Hierarchy metadata — used to build chain-of-command flow diagram */
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
    commanderRank: 'Lieutenant General (★★★)',
    description: 'Operational grouping of 2–3 divisions',
    perParent: '2–3',
    showCount: 3,
  },
  {
    id: 'division',
    label: 'Division',
    unitLabel: 'Division',
    count: '2–3 per Corps',
    commanderRank: 'Major General (★★)',
    description: '10,000–20,000 troops; primary tactical formation',
    perParent: '2–3',
    showCount: 3,
  },
  {
    id: 'brigade',
    label: 'Brigade',
    unitLabel: 'Brigade',
    count: '3 per Division',
    commanderRank: 'Brigadier (★)',
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

/** Division & Formation type metadata for styling */
export const DIVISION_TYPES = {
  infantry: { label: 'Infantry', color: '#4C5D34' },
  mountain: { label: 'Mountain', color: '#2B5F5F' },
  armoured: { label: 'Armoured', color: '#7A4F1E' },
  artillery: { label: 'Artillery', color: '#5C3A8A' },
  strategic: { label: 'Strategic', color: '#1A3A6B' },
  training: { label: 'Training', color: '#2E5A4A' },
  rapid: { label: 'RAPID', color: '#6B3A1A' },
  engineering: { label: 'Engineering', color: '#3A5C5C' },
  airdefence: { label: 'Air Defence', color: '#2A4A6B' },
  mechanized: { label: 'Mechanised', color: '#6B5A1A' },
  para: { label: 'Parachute', color: '#7A2E3A' },
  rifles: { label: 'Rashtriya Rifles', color: '#6A4A3A' },
};

/** The Field Commands */
export const COMMANDS = [
  {
    id: 'eastern',
    name: 'Eastern Command',
    abbreviation: 'EC',
    emblem: armyEasternEmblem,
    location: 'Kolkata',
    state: 'West Bengal',
    stars: 3,
    accentColor: '#2F855A',
    shieldColor: '#1F6044',
    tagline: 'Sentinel of the East',
    established: 1942,
    areaOfOps: 'West Bengal, Sikkim, Arunachal Pradesh, Meghalaya, Assam, Nagaland, Manipur, Tripura, Mizoram, Jharkhand',
    corps: [
      {
        id: 'ec-3', number: 3, romanNumber: 'III',
        name: 'III Corps', nickname: 'Spear Corps',
        location: 'Rangapahar, Nagaland', type: 'mountain', stars: 3,
        motto: 'Stab and Strike',
        divisions: [
          { number: 2, shortName: '2nd Mountain Division', name: '2nd Mountain Division', location: 'Dinjan, Assam', type: 'mountain', stars: 2 },
          { number: 56, shortName: '56th Mountain Division', name: '56th Mountain Division', location: 'Likabali, Arunachal Pradesh', type: 'mountain', stars: 2 },
          { number: 57, shortName: '57th Mountain Division', name: '57th Mountain Division', location: 'Leimakhong, Manipur', type: 'mountain', stars: 2 },
        ],
      },
      {
        id: 'ec-4', number: 4, romanNumber: 'IV',
        name: 'IV Corps', nickname: 'Gajraj Corps',
        location: 'Tezpur, Assam', type: 'mountain', stars: 3,
        motto: 'Victory Always',
        divisions: [
          { number: 5, shortName: '5th Mountain Division', name: '5th Mountain Division', location: 'Bomdila, Arunachal Pradesh', type: 'mountain', stars: 2 },
          { number: 21, shortName: '21st Mountain Division', name: '21st Mountain Division', location: 'Rangia, Assam', type: 'mountain', stars: 2 },
          { number: 71, shortName: '71st Mountain Division', name: '71st Mountain Division', location: 'Missa Mari, Assam', type: 'mountain', stars: 2 },
        ],
      },
      {
        id: 'ec-17', number: 17, romanNumber: 'XVII',
        name: 'XVII Corps', nickname: 'Brahmastra Corps',
        location: 'Panagarh, West Bengal', type: 'strike', stars: 3,
        motto: 'Strike with Power',
        divisions: [
          { number: 59, shortName: '59th Mountain Division', name: '59th Mountain Division', location: 'Panagarh, West Bengal', type: 'mountain', stars: 2 },
          { number: 23, shortName: '23rd Infantry Division', name: '23rd Infantry Division', location: 'Ranchi, Jharkhand', type: 'infantry', stars: 2 },
          { number: 171, shortName: '17 (Indep) Arty Bde', name: '17 (Independent) Artillery Brigade', location: 'Panagarh, West Bengal', type: 'artillery', stars: 1 },
        ],
      },
      {
        id: 'ec-33', number: 33, romanNumber: 'XXXIII',
        name: 'XXXIII Corps', nickname: 'Trishakti Corps',
        location: 'Siliguri, West Bengal', type: 'mountain', stars: 3,
        motto: 'Thunderbolt',
        divisions: [
          { number: 17, shortName: '17th Mountain Division', name: '17th Mountain Division', location: 'Gangtok, Sikkim', type: 'mountain', stars: 2 },
          { number: 20, shortName: '20th Mountain Division', name: '20th Mountain Division', location: 'Binnaguri, West Bengal', type: 'mountain', stars: 2 },
          { number: 27, shortName: '27th Mountain Division', name: '27th Mountain Division', location: 'Kalimpong, West Bengal', type: 'mountain', stars: 2 },
        ],
      },
      {
        id: 'ec-101', number: null, romanNumber: null,
        name: '101 Area', nickname: 'First in Phantoms',
        location: 'Shillong, Meghalaya', type: 'infantry', stars: 3,
        motto: '',
        divisions: [],
      },
      {
        id: 'ec-111', number: null, romanNumber: null,
        name: '111 Area', nickname: 'Sub Area',
        location: 'Bengdubi, West Bengal', type: 'strategic', stars: 3,
        motto: '',
        divisions: [],
      },
    ],
  },

  {
    id: 'central',
    name: 'Central Command',
    abbreviation: 'CC',
    emblem: armyCentralEmblem,
    location: 'Lucknow',
    state: 'Uttar Pradesh',
    stars: 3,
    accentColor: '#4C5D34',
    shieldColor: '#3A4828',
    tagline: 'Heart of the Nation\'s Defence',
    established: 1920,
    areaOfOps: 'Uttar Pradesh, Madhya Pradesh, Uttarakhand, Bihar, Jharkhand, Odisha, Chhattisgarh',
    corps: [
      {
        id: 'cc-uba', number: null, romanNumber: null,
        name: 'Uttar Bharat Area', nickname: 'UB Area',
        location: 'Bareilly', type: 'infantry', stars: 3,
        motto: '',
        divisions: [
          { number: 14, shortName: '14 RAPID Division', name: '14 RAPID Division', location: 'Dehradun', type: 'rapid', stars: 2 },
          { number: 9, shortName: '9 (Indep) Mountain Bde', name: '9 (Independent) Mountain Brigade', location: 'Joshimath', type: 'mountain', stars: 1 },
          { number: 136, shortName: '136 (Indep) Mountain Bde', name: '136 (Independent) Mountain Brigade', location: 'Poo', type: 'mountain', stars: 1 },
          { number: 119, shortName: '119 (Indep) Mountain Bde', name: '119 (Independent) Mountain Brigade', location: 'Pithoragarh', type: 'mountain', stars: 1 },
        ],
      },
      {
        id: 'cc-mba', number: null, romanNumber: null,
        name: 'Madhya Bharat Area', nickname: 'MB Area',
        location: 'Jabalpur', type: 'strategic', stars: 3,
        motto: '',
        divisions: [
          { number: 50, shortName: '50 (Indep) Para Bde', name: '50 (Independent) Parachute Brigade', location: 'Agra', type: 'para', stars: 1 },
        ],
      },
    ],
  },

  {
    id: 'northern',
    name: 'Northern Command',
    abbreviation: 'NC',
    emblem: armyNorthernEmblem,
    location: 'Udhampur',
    state: 'Jammu & Kashmir',
    stars: 3,
    accentColor: '#1A4B7A',
    shieldColor: '#1E3A5F',
    tagline: 'Protecting the Northern Frontier',
    established: 1947,
    areaOfOps: 'J&K, Ladakh, Himachal Pradesh, Punjab, Uttar Pradesh',
    corps: [
      {
        id: 'nc-14', number: 14, romanNumber: 'XIV',
        name: 'XIV Corps', nickname: 'Fire and Fury Corps',
        location: 'Leh, Ladakh', type: 'mountain', stars: 3,
        motto: 'Ready, Aye Ready',
        divisions: [
          { number: 3, shortName: '3rd Infantry Division', name: '3rd Infantry Division', location: 'Karu, Ladakh', type: 'infantry', stars: 2 },
          { number: 8, shortName: '8th Mountain Division', name: '8th Mountain Division', location: 'Dras, Ladakh', type: 'mountain', stars: 2 },
          { number: 72, shortName: '72nd Infantry Division', name: '72nd Infantry Division', location: 'Pathankot, Punjab', type: 'infantry', stars: 2 },
          { number: 254, shortName: '254 (Indep) Armd Bde', name: '254 (Independent) Armoured Brigade', location: 'Leh, Ladakh', type: 'armoured', stars: 1 },
          { number: 102, shortName: '102 (Indep) Inf Bde', name: '102 (Independent) Infantry Brigade', location: 'Partapur, Ladakh', type: 'infantry', stars: 1 },
          { number: 118, shortName: '118 (Indep) Inf Bde', name: '118 (Independent) Infantry Brigade', location: 'Nyoma, Ladakh', type: 'infantry', stars: 1 },
        ],
      },
      {
        id: 'nc-15', number: 15, romanNumber: 'XV',
        name: 'XV Corps', nickname: 'Chinar Corps',
        location: 'Srinagar, J&K', type: 'mountain', stars: 3,
        motto: 'Strike Hard',
        divisions: [
          { number: 19, shortName: '19th Mountain Division', name: '19th Mountain Division', location: 'Baramulla, J&K', type: 'mountain', stars: 2 },
          { number: 28, shortName: '28th Infantry Division', name: '28th Infantry Division', location: 'Gurez, J&K', type: 'infantry', stars: 2 },
          { number: 901, shortName: 'RR "Kilo Force"', name: 'Rashtriya Rifles "Kilo Force"', location: 'J&K', type: 'rifles', stars: 2 },
          { number: 902, shortName: 'RR "Victor Force"', name: 'Rashtriya Rifles "Victor Force"', location: 'J&K', type: 'rifles', stars: 2 },
        ],
      },
      {
        id: 'nc-16', number: 16, romanNumber: 'XVI',
        name: 'XVI Corps', nickname: 'White Knight Corps',
        location: 'Nagrota, J&K', type: 'mountain', stars: 3,
        motto: 'Invincible',
        divisions: [
          { number: 10, shortName: '10 RAPID Division', name: '10 RAPID Division', location: 'Akhnoor, J&K', type: 'rapid', stars: 2 },
          { number: 25, shortName: '25th Infantry Division', name: '25th Infantry Division', location: 'Rajauri, J&K', type: 'infantry', stars: 2 },
          { number: 39, shortName: '39th Mountain Division', name: '39th Mountain Division', location: 'Yol, Himachal Pradesh', type: 'mountain', stars: 2 },
          { number: 903, shortName: 'RR "Delta Force"', name: 'Rashtriya Rifles "Delta Force"', location: 'J&K', type: 'rifles', stars: 2 },
          { number: 904, shortName: 'RR "Romeo Force"', name: 'Rashtriya Rifles "Romeo Force"', location: 'J&K', type: 'rifles', stars: 2 },
          { number: 905, shortName: 'RR "Uniform Force"', name: 'Rashtriya Rifles "Uniform Force"', location: 'J&K', type: 'rifles', stars: 2 },
          { number: 101, shortName: '10th Artillery Brigade', name: '10th Artillery Brigade', location: 'J&K', type: 'artillery', stars: 1 },
        ],
      },
      {
        id: 'nc-1', number: 1, romanNumber: 'I',
        name: 'I Corps', nickname: 'Strike One Corps',
        location: 'Mathura, UP', type: 'strike', stars: 3,
        motto: 'Strike Swiftly',
        divisions: [
          { number: 4, shortName: '4 RAPID Division', name: '4 RAPID Division', location: 'Prayagraj, UP', type: 'rapid', stars: 2 },
          { number: 6, shortName: '6th Mountain Division', name: '6th Mountain Division', location: 'Bareilly, UP', type: 'mountain', stars: 2 },
          { number: 42, shortName: '42nd Artillery Division', name: '42nd Artillery Division', location: 'Bassi, Rajasthan', type: 'artillery', stars: 2 },
          { number: 141, shortName: '14 (Indep) Armd Bde', name: '14 (Independent) Armoured Brigade', location: 'Bhatinda, Punjab', type: 'armoured', stars: 1 },
        ],
      },
    ],
  },

  {
    id: 'southern',
    name: 'Southern Command',
    abbreviation: 'SC',
    emblem: armySouthernEmblem,
    location: 'Pune',
    state: 'Maharashtra',
    stars: 3,
    accentColor: '#744210',
    shieldColor: '#5A3410',
    tagline: 'Guardian of the Peninsula',
    established: 1895,
    areaOfOps: 'Maharashtra, Gujarat, Rajasthan, Madhya Pradesh, Telangana, Tamil Nadu, Goa, Andhra Pradesh, Karnataka',
    corps: [
      {
        id: 'sc-12', number: 12, romanNumber: 'XII',
        name: 'XII Corps', nickname: 'Konark Corps',
        location: 'Jodhpur, Rajasthan', type: 'holding', stars: 3,
        motto: 'Victory Always',
        divisions: [
          { number: 11, shortName: '11th Infantry Division', name: '11th Infantry Division', location: 'Ahmedabad, Gujarat', type: 'infantry', stars: 2 },
          { number: 12, shortName: '12 RAPID Division', name: '12 RAPID Division', location: 'Jaisalmer, Rajasthan', type: 'rapid', stars: 2 },
          { number: 75, shortName: '75 (Indep) Inf Bde', name: '75 (Independent) Infantry Brigade', location: 'Bhuj, Gujarat', type: 'infantry', stars: 1 },
          { number: 4, shortName: '4 (Indep) Armd Bde', name: '4 (Independent) Armoured Brigade', location: 'Jaisalmer, Rajasthan', type: 'armoured', stars: 1 },
          { number: 340, shortName: '340 (Indep) Mech Bde', name: '340 (Independent) Mechanized Brigade', location: 'Ajmer, Rajasthan', type: 'mechanized', stars: 1 },
        ],
      },
      {
        id: 'sc-21', number: 21, romanNumber: 'XXI',
        name: 'XXI Corps', nickname: 'Sudarshan Chakra Corps',
        location: 'Bhopal, Madhya Pradesh', type: 'strike', stars: 3,
        motto: 'Strike & Win',
        divisions: [
          { number: 54, shortName: '54th Infantry Division', name: '54th Infantry Division', location: 'Secunderabad, Telangana', type: 'infantry', stars: 2 },
          { number: 36, shortName: '36 RAPID Division', name: '36 RAPID Division', location: 'Sagar, Madhya Pradesh', type: 'rapid', stars: 2 },
          { number: 31, shortName: '31st Armoured Division', name: '31st Armoured Division', location: 'Jhansi, Uttar Pradesh', type: 'armoured', stars: 2 },
          { number: 41, shortName: '41st Artillery Division', name: '41st Artillery Division', location: 'Pune, Maharashtra', type: 'artillery', stars: 2 },
          { number: 475, shortName: '475th Engineering Brigade', name: '475th Engineering Brigade', location: 'Nasirabad, Rajasthan', type: 'engineering', stars: 1 },
        ],
      },
      {
        id: 'sc-mgga', number: null, romanNumber: null,
        name: 'Maharashtra, Gujarat, and Goa Area', nickname: 'MG&G Area',
        location: 'Mumbai, Maharashtra', type: 'infantry', stars: 3,
        motto: '',
        divisions: [],
      },
      {
        id: 'sc-dba', number: null, romanNumber: null,
        name: 'Dakshin Bharat Area', nickname: 'DB Area',
        location: 'Chennai, Tamil Nadu', type: 'infantry', stars: 3,
        motto: '',
        divisions: [],
      },
    ],
  },

  {
    id: 'south-western',
    name: 'South Western Command',
    abbreviation: 'SWC',
    emblem: armySouthWesternEmblem,
    location: 'Jaipur',
    state: 'Rajasthan',
    stars: 3,
    accentColor: '#B7791F',
    shieldColor: '#8B5E16',
    tagline: 'Shield of the Desert',
    established: 2005,
    areaOfOps: 'Rajasthan, Gujarat, Punjab, Haryana, Uttar Pradesh',
    corps: [
      {
        id: 'swc-direct', number: null, romanNumber: null,
        name: 'Direct Command Formations', nickname: 'Direct Units',
        location: 'Jaipur, Rajasthan', type: 'artillery', stars: null,
        motto: '',
        divisions: [
          { number: 42, shortName: '42nd Artillery Division', name: '42nd Artillery Division', location: 'Jaipur, Rajasthan', type: 'artillery', stars: 2 },
          { number: 33, shortName: '33rd Armoured Division', name: '33rd Armoured Division', location: 'Hisar, Haryana', type: 'armoured', stars: 2 },
        ],
      },
      {
        id: 'swc-10', number: 10, romanNumber: 'X',
        name: 'X Corps', nickname: 'Chetak Corps',
        location: 'Bathinda, Punjab', type: 'holding', stars: 3,
        motto: 'Fight to Win',
        divisions: [
          { number: 16, shortName: '16th Infantry Division', name: '16th Infantry Division', location: 'Sri Ganganagar, Rajasthan', type: 'infantry', stars: 2 },
          { number: 18, shortName: '18 RAPID Division', name: '18 RAPID Division', location: 'Kota, Rajasthan', type: 'rapid', stars: 2 },
          { number: 24, shortName: '24 RAPID Division', name: '24 RAPID Division', location: 'Bikaner, Rajasthan', type: 'rapid', stars: 2 },
          { number: 6, shortName: '6 (Indep) Armd Bde', name: '6 (Independent) Armoured Brigade', location: 'Bhatinda, Punjab', type: 'armoured', stars: 1 },
          { number: 615, shortName: '615 Air-defence Brigade', name: '615th Air-defence Brigade', location: 'Agra, Uttar Pradesh', type: 'airdefence', stars: 1 },
          { number: 471, shortName: '471 Engineering Brigade', name: '471st Engineering Brigade', location: 'N/A', type: 'engineering', stars: 1 },
        ],
      },
    ],
  },

  {
    id: 'western',
    name: 'Western Command',
    abbreviation: 'WC',
    emblem: armyWesternEmblem,
    location: 'Chandimandir',
    state: 'Haryana',
    stars: 3,
    accentColor: '#276749',
    shieldColor: '#1F4F37',
    tagline: 'Sword Arm of the Army',
    established: 1947,
    areaOfOps: 'Punjab, Haryana, Himachal Pradesh, J&K, Uttar Pradesh',
    corps: [
      {
        id: 'wc-2', number: 2, romanNumber: 'II',
        name: 'II Corps', nickname: 'Kharga Corps',
        location: 'Ambala, Haryana', type: 'holding', stars: 3,
        motto: 'Ever Ready',
        divisions: [
          { number: 1, shortName: '1st Armoured Division', name: '1st Armoured Division', location: 'Patiala, Punjab', type: 'armoured', stars: 2 },
          { number: 9, shortName: '9th Infantry Division', name: '9th Infantry Division', location: 'Meerut, Uttar Pradesh', type: 'infantry', stars: 2 },
          { number: 22, shortName: '22nd Infantry Division', name: '22nd Infantry Division', location: 'Meerut, Uttar Pradesh', type: 'infantry', stars: 2 },
          { number: 40, shortName: '40th Artillery Division', name: '40th Artillery Division', location: 'Ambala, Haryana', type: 'artillery', stars: 2 },
          { number: 16, shortName: '16 (Indep) Armd Bde', name: '16 (Independent) Armoured Brigade', location: 'Mamun, Punjab', type: 'armoured', stars: 1 },
          { number: 612, shortName: '612 Air-defence Brigade', name: '612th Air-defence Brigade', location: 'N/A', type: 'airdefence', stars: 1 },
          { number: 474, shortName: '474 Engineering Brigade', name: '474th Engineering Brigade', location: 'N/A', type: 'engineering', stars: 1 },
        ],
      },
      {
        id: 'wc-9', number: 9, romanNumber: 'IX',
        name: 'IX Corps', nickname: 'Rising Star Corps',
        location: 'Yol, Himachal Pradesh', type: 'holding', stars: 3,
        motto: 'Vigilant and Victorious',
        divisions: [
          { number: 26, shortName: '26th Infantry Division', name: '26th Infantry Division', location: 'Jammu, J&K', type: 'infantry', stars: 2 },
          { number: 29, shortName: '29th Infantry Division', name: '29th Infantry Division', location: 'Pathankot, Punjab', type: 'infantry', stars: 2 },
          { number: 2, shortName: '2 (Indep) Armd Bde', name: '2 (Independent) Armoured Brigade', location: 'Mamun, Punjab', type: 'armoured', stars: 1 },
          { number: 3, shortName: '3 (Indep) Armd Bde', name: '3 (Independent) Armoured Brigade', location: 'Ratnuchak, J&K', type: 'armoured', stars: 1 },
        ],
      },
      {
        id: 'wc-11', number: 11, romanNumber: 'XI',
        name: 'XI Corps', nickname: 'Vajra Corps',
        location: 'Jalandhar, Punjab', type: 'holding', stars: 3,
        motto: 'Victory or Death',
        divisions: [
          { number: 7, shortName: '7th Infantry Division', name: '7th Infantry Division', location: 'Firozpur, Punjab', type: 'infantry', stars: 2 },
          { number: 15, shortName: '15th Infantry Division', name: '15th Infantry Division', location: 'Amritsar, Punjab', type: 'infantry', stars: 2 },
          { number: 23, shortName: '23 (Indep) Armd Bde', name: '23 (Independent) Armoured Brigade', location: 'Khasa, Punjab', type: 'armoured', stars: 1 },
          { number: 55, shortName: '55 (Indep) Mech Bde', name: '55 (Independent) Mechanised Brigade', location: 'Beas, Punjab', type: 'mechanized', stars: 1 },
        ],
      },
    ],
  },

  {
    id: 'training',
    name: 'Training Command',
    abbreviation: 'TC',
    emblem: armyTrainingEmblem,
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
        divisions: [],
      },
    ],
  },
];
