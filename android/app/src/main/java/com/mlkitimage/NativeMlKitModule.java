package com.mlkitimage;

import androidx.annotation.NonNull;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.turbomodule.core.CallInvokerHolderImpl;
import com.facebook.react.turbomodule.core.interfaces.TurboModule;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.bridge.Promise;
import com.mlkitimage.specs.NativeMlKitSpec;
import java.util.HashMap;

@ReactModule(name = NativeMlKitSpec.NAME)
public class NativeMlKitModule extends NativeMlKitSpec implements TurboModule {
  public NativeMlKitModule(ReactApplicationContext context) {
    super(context);
  }

  @Override
  public void detectFaces(String imagePath, Promise promise) {
  try {
    System.out.println("🔥 Native detectFaces called with path: " + imagePath);
    
    // Dummy test response
    String resultJson = "[{\"bounds\":{\"left\":10,\"top\":20,\"right\":60,\"bottom\":70}}]";
    
    promise.resolve(resultJson);
  } catch (Exception e) {
    e.printStackTrace();
    promise.reject("FACE_DETECTION_ERROR", e.getMessage());
  }
}
}
