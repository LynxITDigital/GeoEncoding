package com.lynxreact;

import com.facebook.react.ReactActivity;
import com.brentvatne.react.ReactVideoPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.github.yamill.orientation.OrientationPackage;
import com.AirMaps.AirPackage;
import com.imagepicker.ImagePickerPackage;
import org.pgsqlite.SQLitePluginPackage;
import android.content.Intent;
import android.content.res.Configuration;
import com.rnfs.RNFSPackage;
import com.microsoft.codepush.react.CodePush;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;

public class MainActivity extends ReactActivity {

    private CodePush _codePush;
    private ImagePickerPackage mImagePicker;

    @Override
    protected String getJSBundleFile() {
        return this._codePush.getBundleUrl("index.android.bundle");
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "LynxReact";
    }

    /**
     * Returns whether dev mode should be enabled.
     * This enables e.g. the dev menu.
     */
    @Override
    protected boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
    }

    @Override
    public void onActivityResult(final int requestCode, final int resultCode, final Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        mImagePicker.handleActivityResult(requestCode, resultCode, data);
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        Intent intent = new Intent("onConfigurationChanged");
        intent.putExtra("newConfig", newConfig);
        this.sendBroadcast(intent);
    }

   /**
   * A list of packages used by the app. If the app uses additional views
   * or modules besides the default ones, add more packages here.
   */
    @Override
    protected List<ReactPackage> getPackages() {

      mImagePicker = new ImagePickerPackage(this);
      this._codePush = new CodePush("9OcY7WuRIwcigP2x6H5z8bTZPLN94yXS9p7Fg", this, BuildConfig.DEBUG);


      return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
        new ReactVideoPackage(),
        new VectorIconsPackage(),
        new OrientationPackage(this),
        new AirPackage(),
        new RNFSPackage(),
        mImagePicker,
        new SQLitePluginPackage(this),
        this._codePush.getReactPackage()
      );
    }
}
