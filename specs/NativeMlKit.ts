import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  detectFaces(imagePath: string): Promise<string>; // Will return JSON string of face bounds
}

export default TurboModuleRegistry.getEnforcing<Spec>('NativeMlKit');
