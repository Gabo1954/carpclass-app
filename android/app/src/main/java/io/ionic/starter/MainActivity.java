package io.ionic.starter;

import android.os.Bundle;
import android.util.Log;
import androidx.appcompat.app.AppCompatActivity;
import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

import java.io.IOException;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Inicializar OkHttpClient
        OkHttpClient client = new OkHttpClient();

        // Crear la solicitud HTTP (reemplaza "clientes" por tu recurso adecuado)
        Request request = new Request.Builder()
                .url("http://10.0.2.2:3000/clientes") // Cambia "clientes" por el recurso correcto
                .build();

        // Realizar la solicitud asincrónica
        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                // Manejar cualquier error de la solicitud
                e.printStackTrace();
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                if (response.isSuccessful()) {
                    // Procesar los datos de la respuesta
                    String responseData = response.body().string();
                    // Aquí puedes manejar el JSON de la respuesta
                    Log.d("Respuesta JSON", responseData);
                } else {
                    // Manejar la respuesta no exitosa
                    Log.e("Error", "Error en la respuesta: " + response.code());
                }
            }
        });
    }
}
