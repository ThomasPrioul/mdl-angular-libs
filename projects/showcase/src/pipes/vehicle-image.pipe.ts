import { Pipe, PipeTransform } from '@angular/core';
import { ConsistModel, VehicleModel } from '../models/met';

type Replacements = '_L.' | '_R.';
export type VehicleImageRepo = {
  [positionKey: 'EXT1' | 'EXT2' | string]: VehicleImg | string;
};
type VehicleImageRepoFn = (consist: ConsistModel) => VehicleImageRepo;
export type VehicleImg = {
  path: string;
  x?: number;
  y?: number;
  width?: number;
  fullWidth?: number;
  height?: number;
  mirrorX?: boolean;
};

@Pipe({
  name: 'vehicleImg',
  standalone: true,
})
export class VehicleImgPipe implements PipeTransform {
  public transform(
    vehicle: VehicleModel,
    mr: ConsistModel,
    repo: VehicleImageRepo | undefined,
    reversed: boolean
  ): VehicleImg | undefined {
    const keysFnRepo: { [key: string]: (vehicle: VehicleModel, mr?: ConsistModel) => string } = {
      PHZ: regio2nPositionKey,
      '2NG': ter2nNGPositionKey,
      AE2: ae2200PositionKey,
    };
    const getKey = keysFnRepo[mr.lcnCode] ?? defaultPositionKey;
    let img = repo?.[getKey(vehicle, mr)];
    if (!img) return undefined;

    return getImgFullPathWithOrientation(img, reversed);
  }
}

@Pipe({
  name: 'vehicleImgRepo',
  standalone: true,
})
export class VehicleImgRepoPipe implements PipeTransform {
  public transform(consist: ConsistModel): VehicleImageRepo | undefined {
    if (!consist.codeSerieRacine || !consist.codeSerieMateriel) return undefined;
    const repo = seriesRepository.get(consist.codeSerieRacine);
    return typeof repo === 'function' ? repo(consist) : repo;
  }
}

@Pipe({
  name: 'vehicleImgStyle',
  standalone: true,
})
export class VehicleImgStylePipe implements PipeTransform {
  public transform(
    img: VehicleImg,
    scale: number,
    reverse: boolean,
    outline?: boolean
  ): { [klass: string]: string | number | undefined } {
    let transform: string | undefined;

    if ((img.mirrorX === true && !reverse) || (img.mirrorX === false && reverse))
      transform = 'scaleX(-1)';

    if (outline) {
      return {
        'width.em': img.width,
        'height.em': img.height,
        'min-width.px': img.width ? img.width * scale : undefined,
        'min-height.px': img.height ? img.height * scale : undefined,
      };
    } else {
      return {
        'width.px': img.width ? img.width * scale : undefined,
        'height.px': img.height ? img.height * scale : undefined,
        'object-position': this.getObjectPosition(img, scale),
        transform: transform,
      };
    }
  }

  private getObjectPosition(img: VehicleImg, scale: number = 1) {
    if (!img.x && !img.y) return undefined;
    let x = -1 * scale * (img.x ?? 0) + 'px';
    let y = -1 * scale * (img.y ?? 0) + 'px';
    return `${x} ${y}`;
  }
}

function ae2200PositionKey(vehicle: VehicleModel) {
  return `${vehicle.coherencePosition}`;
}

function defaultPositionKey(vehicle: VehicleModel, consist: ConsistModel) {
  const positions = consist.vehicles.map((v) => v.coherencePosition).sort();

  return vehicle.coherencePosition === positions[0]
    ? 'EXT1'
    : vehicle.coherencePosition === positions[positions.length - 1]
    ? 'EXT2'
    : vehicle.numIntEf.slice(undefined, vehicle.numIntEf.length - 3);
}

function getImgFullPathWithOrientation(img: VehicleImg | string, reversed: boolean) {
  const newImg: VehicleImg = typeof img === 'string' ? { path: img } : { ...img };

  // Handle reversed img
  if (reversed && newImg.mirrorX === undefined) {
    const chars: { [key in Replacements]: string } = {
      '_L.': '_R.',
      '_R.': '_L.',
    };
    newImg.path = newImg.path.replace(/_[LR]\./g, (c) => chars[c as Replacements]);
  }

  // Handle specific case of img fractions, full width has to be defined!
  if (reversed && newImg.fullWidth !== undefined && newImg.x !== undefined) {
    newImg.x = newImg.fullWidth - newImg.x - newImg.width!;
  }

  // Set full img URL
  newImg.path = imgRootPath + newImg.path;
  return newImg;
}

function regio2nPositionKey(vehicle: VehicleModel) {
  let results = Array.from(vehicle.numIntEf.matchAll(/Z[ZR]?\d{2}(\d{2})\d{3}/g));

  return results[0][1];
}

function ter2nNGPositionKey(vehicle: VehicleModel) {
  const [_, caisse, numStr] = Array.from(vehicle.numIntEf.matchAll(/(Z[ZR]?\d{2,3})(\d{3})/g))[0];
  const num = parseInt(numStr);
  return { Z26: 'Z1', Z262: 'Z2', Z263: 'Z3' }[caisse] + ((num & 0x01) == 1 ? 'L' : 'R');
}

function z26500Keys(consist: ConsistModel): VehicleImageRepo {
  // General case
  const regions: { [stf: string]: string } = {
    SHF: 'T2BPIC2',
    SNU: 'T2REMI',
    SPC: 'T2ZOU',
  };
  const region = regions[consist.fleetManager]!;
  let repo = {
    Z1L: `/SNCF/AE/Z26500_${region}_Z1_L.GIF`,
    Z2L: `/SNCF/AE/Z26500_${region}_Z2_L.GIF`,
    Z3L: `/SNCF/AE/Z26500_${region}_Z3_L.GIF`,
    Z3R: `/SNCF/AE/Z26500_${region}_Z3_R.GIF`,
    Z2R: `/SNCF/AE/Z26500_${region}_Z2_R.GIF`,
    Z1R: `/SNCF/AE/Z26500_${region}_Z1_R.GIF`,
  };

  return repo;
}

function z5550Keys(consist: ConsistModel): VehicleImageRepo {
  // SNU PCLM Z55500L
  if (consist.fleetManager === 'SNU') return z56700Keys;

  // General case
  const regions: { [stf: string]: string } = {
    SAQ: 'NAQ',
    SBR: 'BRE',
    SHF: 'T2BHDF',
    SOC: 'LIO',
    SPC: 'T2PACA',
    SRA: 'ARA',
  };
  const region = regions[consist.fleetManager]!;
  let repo = {
    '00': { path: `/SNCF/AE/REGIO2N_VE1N1_${region}_L.GIF` },
    '14': { path: `/SNCF/AE/REGIO2N_VI2NL_${region}_R.GIF` },
    '15': { path: `/SNCF/AE/REGIO2N_VI2NC_${region}.GIF` },
    '21': { path: `/SNCF/AE/REGIO2N_VI1N2_${region}_R.GIF` },
    '34': { path: `/SNCF/AE/REGIO2N_VI2NL_${region}_R.GIF` },
    '43': { path: `/SNCF/AE/REGIO2N_VI1N4_${region}_R.GIF` },
    '54': { path: `/SNCF/AE/REGIO2N_VI2NL_${region}_R.GIF` },
    '55': { path: `/SNCF/AE/REGIO2N_VI2NC_${region}_R.GIF` },
    '62': { path: `/SNCF/AE/REGIO2N_VI1N3_${region}_R.GIF` },
    '74': { path: `/SNCF/AE/REGIO2N_VI2NL_${region}_R.GIF` },
    '83': { path: `/SNCF/AE/REGIO2N_VI1N4_${region}_R.GIF` },
    '07': { path: `/SNCF/AE/REGIO2N_VE2N_${region}_R.GIF` },
    '06': { path: `/SNCF/AE/REGIO2N_VE1N2_${region}_R.GIF` },
  };

  // Specific patches
  if (consist.codeSerieMateriel === 'Z5550--C081') {
    repo['55'].path = `/SNCF/AE/REGIO2N_VI2NC_${region}.GIF`;
    repo['62'].path = `/SNCF/AE/REGIO2N_VI1N1_${region}_R.GIF`;
  } else if (consist.codeSerieMateriel === 'Z5550--C083GC') {
    repo['62'].path = `/SNCF/AE/REGIO2N_VI1N1_${region}_R.GIF`;
  } else if (consist.codeSerieMateriel === 'Z5550--C083N083') {
    if (consist.fleetManager === 'SBR') {
      repo['14'].path = '/SNCF/AE/REGIO2N_VI2NL_BRET.GIF';
      repo['55'].path = '/SNCF/AE/REGIO2N_VI2NC_BREI.GIF';
    } else if (consist.fleetManager === 'SOC') {
      repo['14'].path = '/SNCF/AE/REGIO2N_VI2NL_LIO.GIF';
      repo['55'].path = '/SNCF/AE/REGIO2N_VI2NC_LIO.GIF';
      repo['62'].path = '/SNCF/AE/REGIO2N_VI1N1_LIO_R.GIF';
    }
  } else if (consist.codeSerieMateriel === 'Z5550--L110N110') {
    if (consist.fleetManager === 'SBR') {
      repo['14'].path = '/SNCF/AE/REGIO2N_VI2NL_BRET.GIF';
      repo['54'].path = '/SNCF/AE/REGIO2N_VI2NL_BREI.GIF';
      repo['74'].path = '/SNCF/AE/REGIO2N_VI2NL_BRET.GIF';
    }
  }

  return repo;
}

function z56500Keys(consist: ConsistModel): VehicleImageRepo {
  return consist.numImmatEf[3] === '7' ? z56700Keys : z56500PDLKeys;
}

const z5600Keys: VehicleImageRepo = {
  EXT1: '/SNCF/AE/Z5600_STIF_L.GIF',
  ZR25: '/SNCF/AE/ZR2N_STIF_L.GIF',
  ZR35: '/SNCF/AE/ZR2N_STIF_R.GIF',
  EXT2: '/SNCF/AE/Z5600_STIF_R.GIF',
};
const z8800Keys: VehicleImageRepo = {
  EXT1: { path: '/SNCF/AE/Z8800_STIF_R.GIF', mirrorX: true },
  ZR25: '/SNCF/AE/ZR2N_STIF_L.GIF',
  ZR35: '/SNCF/AE/ZR2N_STIF_R.GIF',
  EXT2: { path: '/SNCF/AE/Z8800_STIF_R.GIF', mirrorX: false },
};
const z20500Keys: VehicleImageRepo = {
  EXT1: '/SNCF/AE/Z20500_2S_IDFM_L.GIF',
  ZR25: '/SNCF/AE/ZR201500_1S_IDFM_R.GIF',
  ZR35: '/SNCF/AE/ZR201500_1S_IDFM_R.GIF',
  ZR201: '/SNCF/AE/ZR201500_1S_IDFM_R.GIF',
  ZR202: '/SNCF/AE/ZR201500_1S_IDFM_R.GIF',
  ZR203: '/SNCF/AE/ZR201500_1S_IDFM_R.GIF',
  EXT2: '/SNCF/AE/Z20500_2S_IDFM_R.GIF',
};
const z20900Keys: VehicleImageRepo = {
  EXT1: '/SNCF/AE/Z20900_2S_IDFM_L.GIF',
  ZR25: '/SNCF/AE/ZR2N_STIF_L.GIF',
  ZR35: '/SNCF/AE/ZR2N_STIF_R.GIF',
  ZR201: '/SNCF/AE/ZR201500_1S_IDFM_R.GIF',
  ZR202: '/SNCF/AE/ZR201500_1S_IDFM_R.GIF',
  ZR203: '/SNCF/AE/ZR201500_1S_IDFM_R.GIF',
  EXT2: '/SNCF/AE/Z20900_2S_IDFM_R.GIF',
};
const z22500Keys: VehicleImageRepo = {
  EXT1: '/SNCF/AE/Z22500_RP_L.GIF',
  Z22: '/SNCF/AE/Z22500_M.GIF',
  ZR222: '/SNCF/AE/Z22500_RI.GIF',
  EXT2: '/SNCF/AE/Z22500_RP_R.GIF',
};
const z50000Keys: VehicleImageRepo = {
  EXT1: { path: '/SNCF/AE/Z50000_IDFM_L.GIF', x: 0, width: 166, height: 58, fullWidth: 430 },
  ZR501: { path: '/SNCF/AE/Z50000_IDFM_L.GIF', x: 166, width: 132, height: 58, fullWidth: 430 },
  ZZ502: {
    path: '/SNCF/AE/Z50000_IDFM_L.GIF',
    x: 298,
    width: 430 - 298,
    height: 58,
    fullWidth: 430,
  },
  ZR503: {
    path: '/SNCF/AE/Z50000_IDFM_R8V.GIF',
    x: 0,
    y: -13,
    width: 132,
    height: 58,
    fullWidth: 263,
  },
  ZR504: {
    path: '/SNCF/AE/Z50000_IDFM_R8V.GIF',
    x: 132,
    y: -13,
    width: 263 - 132,
    height: 58,
    fullWidth: 263,
  },
  ZR505: { path: '/SNCF/AE/Z50000_IDFM_R.GIF', x: 0, width: 132, height: 58, fullWidth: 430 },
  ZR506: { path: '/SNCF/AE/Z50000_IDFM_R.GIF', x: 132, width: 132, height: 58, fullWidth: 430 },
  EXT2: {
    path: '/SNCF/AE/Z50000_IDFM_R.GIF',
    x: 132 + 132,
    width: 166,
    height: 58,
    fullWidth: 430,
  },
  ZR507: '/SNCF/AE/Z50000_IDFM_R7V.GIF',
};
const z56500PDLKeys: VehicleImageRepo = {
  '00': '/SNCF/AE/REGIO2N_VE1N1_PDL_L.GIF',
  '14': '/SNCF/AE/REGIO2N_VI2NL_PDL.GIF',
  '21': '/SNCF/AE/REGIO2N_VI1N2_PDL_R.GIF',
  '54': '/SNCF/AE/REGIO2N_VI2NL_PDL.GIF',
  '62': '/SNCF/AE/REGIO2N_VI1N3_PDL_R.GIF',
  '74': '/SNCF/AE/REGIO2N_VI2NL_PDL.GIF',
  '83': '/SNCF/AE/REGIO2N_VI1N4_PDL_R.GIF',
  '07': '/SNCF/AE/REGIO2N_VE2N_PDL_R.GIF',
};
const z56600Keys: VehicleImageRepo = {
  '00': '/SNCF/AE/OMNEOPREM_VE1N1_NORM_L.GIF',
  '14': '/SNCF/AE/OMNEOPREM_VI2N2_NORM.GIF',
  '21': '/SNCF/AE/OMNEOPREM_VI1N1_NORM_R.GIF',
  '34': '/SNCF/AE/OMNEOPREM_VI2N2_NORM.GIF',
  '43': '/SNCF/AE/OMNEOPREM_VI1N2_NORM_R.GIF',
  '54': '/SNCF/AE/OMNEOPREM_VI2N2_NORM.GIF',
  '62': '/SNCF/AE/OMNEOPREM_VI1N3_NORM_R.GIF',
  '74': '/SNCF/AE/OMNEOPREM_VI2N2_NORM.GIF',
  '83': '/SNCF/AE/OMNEOPREM_VI1N4_NORM_R.GIF',
  '07': '/SNCF/AE/OMNEOPREM_VE2N_NORM_R.GIF',
};
const z56700Keys: VehicleImageRepo = {
  '00': '/SNCF/AE/OMNEOPREM_VE1N1_REMI_L.GIF',
  '14': '/SNCF/AE/OMNEOPREM_VI2NL_REMI.GIF',
  '21': '/SNCF/AE/OMNEOPREM_VI1N2_REMI_R.GIF',
  '54': '/SNCF/AE/OMNEOPREM_VI2NL_REMI.GIF',
  '62': '/SNCF/AE/OMNEOPREM_VI1N3_REMI_R.GIF',
  '74': '/SNCF/AE/OMNEOPREM_VI2NL_REMI.GIF',
  '83': '/SNCF/AE/OMNEOPREM_VI1N4_REMI_R.GIF',
  '07': '/SNCF/AE/OMNEOPREM_VE2N_REMI_R.GIF',
};
const z57000Keys: VehicleImageRepo = {
  '00': '/SNCF/AE/REGIO2N_VE1N1_IDFM_L.GIF',
  '14': '/SNCF/AE/REGIO2N_VI2NL1_IDFM.GIF',
  '21': '/SNCF/AE/REGIO2N_VI1N2_IDFM_R.GIF',
  '54': '/SNCF/AE/REGIO2N_VI2NL2_IDFM.GIF',
  '62': '/SNCF/AE/REGIO2N_VI1N3_IDFM_R.GIF',
  '74': '/SNCF/AE/REGIO2N_VI2NL1_IDFM.GIF',
  '83': '/SNCF/AE/REGIO2N_VI1N4_IDFM_R.GIF',
  '07': '/SNCF/AE/REGIO2N_VE2N_IDFM_R.GIF',
};
const seriesRepository = new Map<string | Symbol, VehicleImageRepo | VehicleImageRepoFn>([
  ['Z5600', z5600Keys],
  ['Z8800', z8800Keys],
  ['Z20500', z20500Keys],
  ['Z20900', z20900Keys],
  ['Z22500', z22500Keys],
  ['Z26500', z26500Keys],
  ['Z50000', z50000Keys],
  ['Z5550', z5550Keys],
  ['Z56500', z56500Keys],
  ['Z56600', z56600Keys],
  ['Z57000', z57000Keys],
  // ['AE2200', ae2200Keys],
]);
const imgRootPath = 'assets/mlgtraffic';
