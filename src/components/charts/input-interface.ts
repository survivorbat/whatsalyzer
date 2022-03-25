import WhatsappData from '../../logic/whatsapp-data';

export interface InputData {
  data: WhatsappData;
}

export interface InputCloudData {
  data: WhatsappData;
  minFrequency: number;
  minLength?: number;
  minFontSize: number;
  maxFontSize: number;
}
