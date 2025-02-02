
export enum DamageCategory {
  Vehicle = "Vehicle",
  Property = "Property"
}

export enum DamageVehicleSubcategory {
  Accident = "Accident",
  Theft = "Theft",
  Other = "Other"
}

export enum DamagePropertySubcategory {
  Flood = "Flood",
  Fire = "Fire",
  Other = "Other"
}

export enum ClaimStatus {
  Pending = "Pending",
  UnderReview = "Under Review",
  Approved = "Approved",
  Rejected = "Rejected"
}

export enum ClaimAction {
  Cancel,
  Create,
  Remove,
  Edit
}

interface BaseClaim {
  id: string | null,
  policyholderName: string,
  incidentDate: string | null,
  description: string,
  estimatedRepairCost: number | null,
  status: any
}

interface VehicleDamageClaim extends BaseClaim {
  damageCategory: DamageCategory.Vehicle | null,
  damageSubcategory: DamageVehicleSubcategory | null
}

interface PropertyDamageClaim extends BaseClaim {
  damageCategory: DamageCategory.Property | null,
  damageSubcategory: DamagePropertySubcategory | null
}

export type Claim = VehicleDamageClaim | PropertyDamageClaim;

export class ClaimService {

  public claimTableColumns: Array<any> = [
    {
      name: 'ID',
      technicalName: 'id'
    },
    {
      name: 'Policy holder',
      technicalName: 'policyholderName'
    },
    {
      name: 'Incident date',
      technicalName: 'incidentDate'
    },
    {
      name: 'Damage category',
      technicalName: 'damageCategory'
    },
    {
      name: 'Damage subcategory',
      technicalName: 'damageSubcategory'
    },
    {
      name: 'Description',
      technicalName: 'description'
    },
    {
      name: 'Estimated cost',
      technicalName: 'estimatedRepairCost'
    },
    {
      name: 'Status',
      technicalName: 'status'
    }
  ];

  constructor() {
  }

  public new(): Claim {
    return <Claim>{
      id: null,
      policyholderName: '',
      incidentDate: null,
      damageCategory: null,
      damageSubcategory: null,
      description: '',
      estimatedRepairCost: null,
      status: ClaimStatus.Pending
    }
  }
}
